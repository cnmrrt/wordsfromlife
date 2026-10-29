import { randomUUID } from 'node:crypto'
import { readFile, rename, unlink, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import sanitizeHtml from 'sanitize-html'
import { createError } from 'h3'

export const collectionFiles = {
  words: 'words.json',
  authors: 'author-quotes.json',
  proverbs: 'preverbs.json'
} as const

export type AdminCollection = keyof typeof collectionFiles
type ContentRecord = Record<string, unknown> & { id: string }

const dataDirectory = resolve(process.cwd(), 'public/static/data')
const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  'article',
  'header',
  'section',
  'style',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td'
]

function getCollection(value: unknown): AdminCollection {
  if (typeof value !== 'string' || !Object.hasOwn(collectionFiles, value)) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown content collection' })
  }

  return value as AdminCollection
}

export async function readCollection(value: unknown): Promise<ContentRecord[]> {
  const collection = getCollection(value)
  const path = resolve(dataDirectory, collectionFiles[collection])

  try {
    const records: unknown = JSON.parse(await readFile(path, 'utf8'))
    if (!Array.isArray(records) || records.some(record => !record || typeof record !== 'object' || Array.isArray(record))) {
      throw createError({ statusCode: 500, statusMessage: `Invalid data in ${collectionFiles[collection]}` })
    }

    return records as ContentRecord[]
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: `Could not read ${collectionFiles[collection]}`
    })
  }
}

function cleanHtml(value: string): string {
  return sanitizeHtml(value, {
    allowedTags,
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true)
    }
  })
}

export function sanitizeRecordForAdmin(record: ContentRecord): ContentRecord {
  const safeRecord = { ...record }

  for (const field of ['content', 'en_meta_desc', 'tr_meta_desc']) {
    if (typeof safeRecord[field] === 'string') {
      safeRecord[field] = cleanHtml(safeRecord[field])
    }
  }

  for (const field of ['en_quotes', 'tr_quotes']) {
    if (Array.isArray(safeRecord[field])) {
      safeRecord[field] = safeRecord[field].map(quote =>
        typeof quote === 'string' ? cleanHtml(quote) : quote
      )
    } else if (typeof safeRecord[field] === 'string') {
      safeRecord[field] = cleanHtml(safeRecord[field])
    }
  }

  return safeRecord
}

function validateRecord(collection: AdminCollection, value: unknown): ContentRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw createError({ statusCode: 400, statusMessage: 'Record must be an object' })
  }

  const record = value as Record<string, unknown>
  if (typeof record.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID must be a lowercase URL slug' })
  }

  const titleField = collection === 'words' ? 'word' : collection === 'proverbs' ? 'preverb' : 'name'
  if (typeof record[titleField] !== 'string' || !record[titleField].trim()) {
    throw createError({ statusCode: 400, statusMessage: `${titleField} is required` })
  }

  if (collection === 'authors' && (typeof record.surname !== 'string' || !record.surname.trim())) {
    throw createError({ statusCode: 400, statusMessage: 'surname is required' })
  }

  for (const field of ['content', 'en_meta_desc', 'tr_meta_desc']) {
    if (typeof record[field] === 'string') {
      record[field] = cleanHtml(record[field])
    }
  }

  for (const field of ['en_quotes', 'tr_quotes']) {
    if (Array.isArray(record[field])) {
      if (!record[field].every(quote => typeof quote === 'string')) {
        throw createError({ statusCode: 400, statusMessage: `${field} must contain text entries` })
      }

      record[field] = record[field].map(quote => cleanHtml(quote))
    }
  }

  return record as ContentRecord
}

export async function saveRecord(
  value: unknown,
  previousId: unknown,
  valueRecord: unknown
): Promise<void> {
  const collection = getCollection(value)
  const records = await readCollection(collection)
  const record = validateRecord(collection, valueRecord)
  const existingIndex = typeof previousId === 'string'
    ? records.findIndex(item => item.id === previousId)
    : -1

  if (typeof previousId === 'string' && existingIndex === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Record to update was not found' })
  }

  if (records.some((item, index) => index !== existingIndex && item.id === record.id)) {
    throw createError({ statusCode: 409, statusMessage: 'Another record already uses this ID' })
  }

  if (existingIndex === -1) {
    records.push(record)
  } else {
    records[existingIndex] = record
  }

  const path = resolve(dataDirectory, collectionFiles[collection])
  const temporaryPath = `${path}.${randomUUID()}.tmp`

  try {
    await writeFile(temporaryPath, `${JSON.stringify(records, null, 2)}\n`, 'utf8')
    await rename(temporaryPath, path)
  } catch {
    await unlink(temporaryPath).catch(() => undefined)
    throw createError({
      statusCode: 500,
      statusMessage: `Could not save ${collectionFiles[collection]}`
    })
  }
}
