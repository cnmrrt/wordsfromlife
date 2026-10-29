import { defineEventHandler } from 'h3'
import { clearAdminSession } from '../../utils/admin'

export default defineEventHandler((event) => {
  clearAdminSession(event)
  return { authenticated: false }
})
