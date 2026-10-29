import { createError, defineEventHandler, readBody } from 'h3'
import { createAdminSession, verifyAdminCredentials } from '../../utils/admin'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ username?: unknown; password?: unknown }>(event)
  const username = typeof body?.username === 'string' ? body.username : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (username.length > 128 || password.length > 1024 || !verifyAdminCredentials(event, username, password)) {
    throw createError({ statusCode: 401, statusMessage: 'Incorrect username or password' })
  }

  createAdminSession(event)
  return { authenticated: true }
})
