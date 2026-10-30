import { defineEventHandler, readBody } from 'h3'
import { requireAdminSession } from '../../utils/admin'
import { createWord } from '../../utils/supabaseWords'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)
  const body = await readBody(event)
  return await createWord(event, body)
})
