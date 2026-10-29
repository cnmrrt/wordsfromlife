import { defineEventHandler } from 'h3'
import { requireAdminSession } from '../../utils/admin'

export default defineEventHandler((event) => {
  requireAdminSession(event)
  return { authenticated: true }
})
