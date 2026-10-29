import { createHmac, timingSafeEqual } from 'node:crypto'
import { createError, deleteCookie, getCookie, setCookie } from 'h3'
import type { H3Event } from 'h3'

const SESSION_COOKIE = 'wordsfromlife_admin'
const SESSION_TTL_SECONDS = 8 * 60 * 60

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

function getAdminConfig(event: H3Event) {
  const config = useRuntimeConfig(event)
  const username = config.adminUsername
  const password = config.adminPassword
  const secret = config.adminSessionSecret

  if (!username || !password || !secret) {
    throw createError({ statusCode: 503, statusMessage: 'Admin credentials are not configured' })
  }

  return { username, password, secret }
}

function sign(expiry: string, secret: string): string {
  return createHmac('sha256', secret).update(expiry).digest('hex')
}

export function verifyAdminCredentials(event: H3Event, username: string, password: string): boolean {
  const expected = getAdminConfig(event)
  return safeEqual(username, expected.username) && safeEqual(password, expected.password)
}

export function createAdminSession(event: H3Event): void {
  const { secret } = getAdminConfig(event)
  const expiry = String(Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS)

  setCookie(event, SESSION_COOKIE, `${expiry}.${sign(expiry, secret)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS
  })
}

export function clearAdminSession(event: H3Event): void {
  deleteCookie(event, SESSION_COOKIE, { path: '/' })
}

export function requireAdminSession(event: H3Event): void {
  const { secret } = getAdminConfig(event)
  const token = getCookie(event, SESSION_COOKIE)
  const [expiry, signature, extra] = token?.split('.') || []

  if (
    !expiry ||
    !signature ||
    extra ||
    !/^\d+$/.test(expiry) ||
    Number(expiry) <= Math.floor(Date.now() / 1000) ||
    !safeEqual(signature, sign(expiry, secret))
  ) {
    throw createError({ statusCode: 401, statusMessage: 'Admin authentication required' })
  }
}
