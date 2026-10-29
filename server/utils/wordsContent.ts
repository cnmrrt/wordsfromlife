import { randomUUID } from 'node:crypto'
import { readFile, rename, unlink, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createError } from 'h3'
import sanitizeHtml from 'sanitize-html'

export type WordRecord = Record<string, unknown> & { id: string }

const wordsPath = resolve(process.cwd(), 'public/static/data/words.json')
const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  'article',
  'header',
  'section',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td'
]
const allowedCssProperties = new Set([
  'background-color',
  'border',
  'border-left',
  'border-radius',
  'font-weight',
  'margin',
  'margin-top',
  'padding'
])

export async function readWords(): Promise<WordRecord[]> {
  try {
    const records: unknown = JSON.parse(await readFile(wordsPath, 'utf8'))
    if (!Array.isArray(records) || records.some(record => !record || typeof record !== 'object' || Array.isArray(record))) {
      throw createError({ statusCode: 500, statusMessage: 'Invalid words.json data' })
    }

    return records as WordRecord[]
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    throw createError({ statusCode: 500, statusMessage: 'Could not read words.json' })
  }
}

function cleanHtml(value: string): string {
  const safeStyles: string[] = []
  const content = value.replace(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi, (_match, css: string) => {
    const rules = css.replace(/([^{}]+)\{([^{}]*)\}/g, (_rule, selector: string, declarations: string) => {
      if (!/^\s*(?:\.[\w-]+\s*,?\s*)+$/.test(selector)) return ''

      const safeDeclarations = declarations.split(';').flatMap((declaration) => {
        const [property, ...parts] = declaration.split(':')
        const name = property?.trim().toLowerCase()
        const content = parts.join(':').trim()
        if (
          !name ||
          !allowedCssProperties.has(name) ||
          !content ||
          !/^[\w#(),.%\s-]+$/.test(content) ||
          /\b(?:url|expression|var)\s*\(/i.test(content)
        ) {
          return []
        }

        return [`${name}:${content}`]
      })

      return safeDeclarations.length
        ? `${selector.trim()}{${safeDeclarations.join(';')}}`
        : ''
    })

    if (rules.trim()) safeStyles.push(`<style>${rules}</style>`)
    return ''
  })

  const safeContent = sanitizeHtml(content, {
    allowedTags,
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      '*': ['class']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true)
    }
  })

  return [safeContent, ...safeStyles].filter(Boolean).join('\n')
}

export function sanitizeWordForAdmin(record: WordRecord): WordRecord {
  const safeRecord = { ...record }

  if (typeof safeRecord.content === 'string') {
    safeRecord.content = cleanHtml(safeRecord.content)
  }
  if (typeof safeRecord.en_meta_desc === 'string') {
    safeRecord.en_meta_desc = cleanHtml(safeRecord.en_meta_desc)
  }

  return safeRecord
}

function validateRecord(value: unknown): WordRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw createError({ statusCode: 400, statusMessage: 'Word record must be an object' })
  }

  const record = value as Record<string, unknown>
  if (typeof record.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID must be a lowercase URL slug' })
  }
  if (typeof record.word !== 'string' || !record.word.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Word is required' })
  }
  if (typeof record.content !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Content is required' })
  }

  return sanitizeWordForAdmin(record as WordRecord)
}

export async function saveWord(previousId: unknown, rawRecord: unknown): Promise<void> {
  const records = await readWords()
  const record = validateRecord(rawRecord)
  const existingIndex = typeof previousId === 'string'
    ? records.findIndex(item => item.id === previousId)
    : -1

  if (typeof previousId === 'string' && existingIndex === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Word to update was not found' })
  }
  if (records.some((item, index) => index !== existingIndex && item.id === record.id)) {
    throw createError({ statusCode: 409, statusMessage: 'Another word already uses this ID' })
  }

  if (existingIndex === -1) {
    records.push(record)
  } else {
    records[existingIndex] = record
  }

  const temporaryPath = `${wordsPath}.${randomUUID()}.tmp`
  try {
    await writeFile(temporaryPath, `${JSON.stringify(records, null, 2)}\n`, 'utf8')
    await rename(temporaryPath, wordsPath)
  } catch {
    await unlink(temporaryPath).catch(() => undefined)
    throw createError({ statusCode: 500, statusMessage: 'Could not save words.json' })
  }
}
