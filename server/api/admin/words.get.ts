import { defineEventHandler } from 'h3'
import { requireAdminSession } from '../../utils/admin'
import { readWords, sanitizeWordForAdmin } from '../../utils/wordsContent'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)
  return (await readWords()).map(sanitizeWordForAdmin)
})
