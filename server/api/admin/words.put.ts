import { createError, defineEventHandler, readBody } from 'h3'
import { requireAdminSession } from '../../utils/admin'
import { saveWord } from '../../utils/wordsContent'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)
  const body = await readBody<{ previousId?: unknown; record?: unknown }>(event)

  if (!body || typeof body !== 'object' || Array.isArray(body) || !('record' in body)) {
    throw createError({ statusCode: 400, statusMessage: 'Word record is required' })
  }

  await saveWord(body.previousId, body.record)
  return { saved: true }
})
