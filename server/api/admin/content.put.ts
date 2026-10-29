import { createError, defineEventHandler, readBody } from 'h3'
import { requireAdminSession } from '../../utils/admin'
import { saveRecord } from '../../utils/adminContent'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)
  const body = await readBody<{
    collection?: unknown
    previousId?: unknown
    record?: unknown
  }>(event)

  if (!body || typeof body !== 'object' || Array.isArray(body) || !('collection' in body) || !('record' in body)) {
    throw createError({ statusCode: 400, statusMessage: 'Collection and record are required' })
  }

  await saveRecord(body.collection, body.previousId, body.record)
  return { saved: true }
})
