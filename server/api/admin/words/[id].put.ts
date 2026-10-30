import { createError, defineEventHandler, getRouterParam, readBody } from 'h3'
import { requireAdminSession } from '../../../utils/admin'
import { updateWord } from '../../../utils/supabaseWords'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Word ID is required' })

  const body = await readBody(event)
  await updateWord(event, id, body)
  return { saved: true }
})
