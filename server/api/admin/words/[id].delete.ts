import { createError, defineEventHandler, getRouterParam } from 'h3'
import { requireAdminSession } from '../../../utils/admin'
import { deleteWord } from '../../../utils/supabaseWords'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Word ID is required' })

  await deleteWord(event, id)
  return { deleted: true }
})
