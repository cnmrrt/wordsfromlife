import { defineEventHandler } from 'h3'
import { requireAdminSession } from '../../utils/admin'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)
  return { authenticated: true }
})
