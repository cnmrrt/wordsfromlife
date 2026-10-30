import { defineEventHandler } from 'h3'
import { requireAdminSession } from '../../utils/admin'
import { fetchWords, sanitizeWord } from '../../utils/supabaseWords'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)
  return (await fetchWords(event)).map(sanitizeWord)
})
