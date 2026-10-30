import { createError } from 'h3'
import type { H3Event } from 'h3'
import sanitizeHtml from 'sanitize-html'
import { getServerEnvironmentValue } from './environment'

export type WordRecord = Record<string, unknown> & { id: string | number }

const TABLE = 'en_words'
const PAGE_SIZE = 500
const editableTags = [
  ...sanitizeHtml.defaults.allowedTags,
  'img',
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
const simpleCssSelector = '(?:\\*|[a-z][\\w-]*|[.#][\\w-]+)(?:[.#][\\w-]+)*'
const cssSelectorPattern = new RegExp(`^${simpleCssSelector}(?:(?:\\s+|>\\s*|\\+\\s*|~\\s*)${simpleCssSelector})*$`, 'i')
const editableCssProperties = [
  'align-items',
  'background-color',
  'border',
  'border-left',
  'border-radius',
  'color',
  'display',
  'font-size',
  'font-style',
  'font-weight',
  'height',
  'line-height',
  'margin',
  'margin-top',
  'max-width',
  'object-fit',
  'padding',
  'text-align',
  'text-decoration',
  'width'
]
const safeCssValue = /^(?!.*\b(?:url|expression|var)\s*\()[\w#(),.%\s-]+$/i
const editableCssStyles = {
  '*': Object.fromEntries(editableCssProperties.map(property => [property, [safeCssValue]]))
}

function supabaseConfig(event: H3Event) {
  const config = useRuntimeConfig(event)
  const url = String(getServerEnvironmentValue(event, config.supabaseUrl, 'NUXT_SUPABASE_URL', 'SUPABASE_URL') || '').replace(/\/+$/, '')
  const key = getServerEnvironmentValue(event, config.supabaseServiceRoleKey, 'NUXT_SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_SERVICE_ROLE_KEY')

  if (!url) {
    throw createError({ statusCode: 503, statusMessage: 'NUXT_SUPABASE_URL is not configured' })
  }
  if (!key) {
    throw createError({ statusCode: 503, statusMessage: 'NUXT_SUPABASE_SERVICE_ROLE_KEY is not configured' })
  }

  return { url, key }
}

async function supabaseRequest<T>(
  event: H3Event,
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const { url, key } = supabaseConfig(event)

  let response: Response
  try {
    response = await fetch(`${url}/rest/v1/${TABLE}${path}`, {
      ...options,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Could not connect to Supabase' })
  }

  if (!response.ok) {
    const detail = await response.text()
    console.error(`Supabase ${options.method || 'GET'} ${TABLE} failed (${response.status}): ${detail}`)
    throw createError({
      statusCode: response.status === 401 || response.status === 403 ? 502 : response.status,
      statusMessage: 'Supabase request failed; check the table, API key, and row-level security settings'
    })
  }

  if (response.status === 204) return undefined as T
  return await response.json() as T
}

export async function fetchWords(event: H3Event): Promise<WordRecord[]> {
  const words: WordRecord[] = []

  for (let offset = 0; ; offset += PAGE_SIZE) {
    const page = await supabaseRequest<WordRecord[]>(
      event,
      `?select=*&order=word.asc`,
      { headers: { Range: `${offset}-${offset + PAGE_SIZE - 1}`, 'Range-Unit': 'items' } }
    )

    if (!Array.isArray(page)) {
      throw createError({ statusCode: 502, statusMessage: 'Supabase returned an invalid words response' })
    }

    words.push(...page)
    if (page.length < PAGE_SIZE) return words
  }
}

export async function fetchWordIndex(event: H3Event): Promise<Pick<WordRecord, 'id' | 'word'>[]> {
  const words: Pick<WordRecord, 'id' | 'word'>[] = []

  for (let offset = 0; ; offset += PAGE_SIZE) {
    const page = await supabaseRequest<Pick<WordRecord, 'id' | 'word'>[]>(
      event,
      '?select=id,word&order=word.asc',
      { headers: { Range: `${offset}-${offset + PAGE_SIZE - 1}`, 'Range-Unit': 'items' } }
    )

    if (!Array.isArray(page)) {
      throw createError({ statusCode: 502, statusMessage: 'Supabase returned an invalid words response' })
    }

    words.push(...page)
    if (page.length < PAGE_SIZE) return words
  }
}

export async function fetchWordBySlug(event: H3Event, slug: string): Promise<WordRecord | null> {
  if (!/^[\w-]{1,200}$/.test(slug)) return null

  const query = new URLSearchParams({
    select: 'id,word,content,en_meta_desc,img,img_width,img_height',
    id: `ilike.${slug}`,
    limit: '1'
  })
  const words = await supabaseRequest<WordRecord[]>(event, `?${query.toString()}`)
  if (!Array.isArray(words)) {
    throw createError({ statusCode: 502, statusMessage: 'Supabase returned an invalid word response' })
  }

  return words[0] ? sanitizeWord(words[0]) : null
}

function sanitizeHtmlContent(value: string): string {
  const safeStyles: string[] = []
  const content = value.replace(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi, (_match, css: string) => {
    const safeRules = css.replace(/([^{}]+)\{([^{}]*)\}/g, (_rule, selector: string, declarations: string) => {
      if (!selector.split(',').every(item => cssSelectorPattern.test(item.trim()))) return ''

      const safeDeclarations = declarations.split(';').flatMap((declaration) => {
        const [property, ...parts] = declaration.split(':')
        const name = property?.trim().toLowerCase()
        const value = parts.join(':').trim()
        if (
          !name ||
          !editableCssProperties.includes(name) ||
          !value ||
          !safeCssValue.test(value)
        ) {
          return []
        }

        return [`${name}:${value}`]
      })

      return safeDeclarations.length ? `${selector.trim()}{${safeDeclarations.join(';')}}` : ''
    })

    if (safeRules.trim()) safeStyles.push(`<style>${safeRules}</style>`)
    return ''
  })

  const safeContent = sanitizeHtml(content, {
    allowedTags: editableTags,
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      '*': ['class', 'style']
    },
    allowedStyles: editableCssStyles,
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true)
    }
  })

  return [safeContent, ...safeStyles].filter(Boolean).join('\n')
}

export function sanitizeWord(record: WordRecord): WordRecord {
  const sanitized = { ...record }

  for (const field of ['content', 'en_meta_desc']) {
    if (typeof sanitized[field] === 'string') {
      sanitized[field] = sanitizeHtmlContent(sanitized[field])
    }
  }

  return sanitized
}

export async function updateWord(
  event: H3Event,
  id: string,
  value: unknown
): Promise<void> {
  if (!id || id.length > 200) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid word ID' })
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw createError({ statusCode: 400, statusMessage: 'Word data must be an object' })
  }

  const currentWords = await fetchWords(event)
  const current = currentWords.find(word => String(word.id) === id)
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Word not found' })
  }

  const submitted = value as Record<string, unknown>
  const changed: Record<string, unknown> = {}

  for (const [field, fieldValue] of Object.entries(submitted)) {
    if (field === 'id') continue
    if (!(field in current)) {
      throw createError({ statusCode: 400, statusMessage: `Unknown word field: ${field}` })
    }
    changed[field] = typeof fieldValue === 'string' && ['content', 'en_meta_desc'].includes(field)
      ? sanitizeHtmlContent(fieldValue)
      : fieldValue
  }

  if (typeof submitted.word === 'string' && !submitted.word.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Word cannot be empty' })
  }

  const query = new URLSearchParams({ id: `eq.${id}` })
  const updated = await supabaseRequest<WordRecord[]>(
    event,
    `?${query.toString()}`,
    {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(changed)
    }
  )

  if (!Array.isArray(updated) || updated.length !== 1) {
    throw createError({ statusCode: 409, statusMessage: 'Word was not updated; verify its ID and Supabase policies' })
  }
}

export async function createWord(event: H3Event, value: unknown): Promise<WordRecord> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw createError({ statusCode: 400, statusMessage: 'Word data must be an object' })
  }

  const submitted = value as Record<string, unknown>
  const id = typeof submitted.id === 'string' ? submitted.id.trim().toLowerCase() : ''
  const word = typeof submitted.word === 'string' ? submitted.word.trim() : ''

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || id.length > 200) {
    throw createError({ statusCode: 400, statusMessage: 'ID must be a lowercase URL slug using letters, numbers, and hyphens' })
  }
  if (!word) {
    throw createError({ statusCode: 400, statusMessage: 'Word cannot be empty' })
  }

  const allowedFields = new Set(['id', 'word', 'content', 'en_meta_desc', 'img', 'img_height', 'img_width'])
  for (const field of Object.keys(submitted)) {
    if (!allowedFields.has(field)) {
      throw createError({ statusCode: 400, statusMessage: `Unknown word field: ${field}` })
    }
  }

  const query = new URLSearchParams({ select: 'id' })
  query.set('id', `eq.${id}`)
  const existing = await supabaseRequest<WordRecord[]>(event, `?${query.toString()}`)
  if (!Array.isArray(existing)) {
    throw createError({ statusCode: 502, statusMessage: 'Supabase returned an invalid word response' })
  }
  if (existing.length) {
    throw createError({ statusCode: 409, statusMessage: 'A word with this ID already exists' })
  }

  const record: Record<string, unknown> = {
    id,
    word,
    content: typeof submitted.content === 'string' ? sanitizeHtmlContent(submitted.content) : '',
    en_meta_desc: typeof submitted.en_meta_desc === 'string'
      ? sanitizeHtmlContent(submitted.en_meta_desc)
      : null,
    img: typeof submitted.img === 'string' && submitted.img.trim() ? submitted.img.trim() : null,
    img_height: submitted.img_height ?? null,
    img_width: submitted.img_width ?? null
  }

  const created = await supabaseRequest<WordRecord[]>(
    event,
    '?select=*',
    {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(record)
    }
  )

  if (!Array.isArray(created) || created.length !== 1) {
    throw createError({ statusCode: 409, statusMessage: 'Word was not created; verify the Supabase table and policies' })
  }

  return sanitizeWord(created[0]!)
}

export async function deleteWord(event: H3Event, id: string): Promise<void> {
  if (!id || id.length > 200) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid word ID' })
  }

  const currentWords = await fetchWords(event)
  if (!currentWords.some(word => String(word.id) === id)) {
    throw createError({ statusCode: 404, statusMessage: 'Word not found' })
  }

  const query = new URLSearchParams({ id: `eq.${id}` })
  const deleted = await supabaseRequest<WordRecord[]>(
    event,
    `?${query.toString()}`,
    {
      method: 'DELETE',
      headers: { Prefer: 'return=representation' }
    }
  )

  if (!Array.isArray(deleted) || deleted.length !== 1) {
    throw createError({ statusCode: 409, statusMessage: 'Word was not deleted; verify its ID and Supabase policies' })
  }
}
