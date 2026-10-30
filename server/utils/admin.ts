import { createError, deleteCookie, getCookie, getRequestURL, setCookie } from 'h3'
import type { H3Event } from 'h3'
import { getServerEnvironmentValue } from './environment'

const SESSION_COOKIE = 'words_admin_session'
const SESSION_TTL_SECONDS = 8 * 60 * 60

function safeEqual(left: string, right: string): boolean {
  const leftBytes = new TextEncoder().encode(left)
  const rightBytes = new TextEncoder().encode(right)
  if (leftBytes.length !== rightBytes.length) return false

  let difference = 0
  for (let index = 0; index < leftBytes.length; index++) {
    difference |= leftBytes[index]! ^ rightBytes[index]!
  }
  return difference === 0
}

function getAdminConfig(event: H3Event) {
  const config = useRuntimeConfig(event)
  const adminUsername = getServerEnvironmentValue(event, config.adminUsername, 'NUXT_ADMIN_USERNAME', 'ADMIN_USERNAME')
  const adminPassword = getServerEnvironmentValue(event, config.adminPassword, 'NUXT_ADMIN_PASSWORD', 'ADMIN_PASSWORD')
  const adminSessionSecret = getServerEnvironmentValue(event, config.adminSessionSecret, 'NUXT_ADMIN_SESSION_SECRET', 'ADMIN_SESSION_SECRET')

  if (!adminUsername || !adminPassword || !adminSessionSecret) {
    throw createError({ statusCode: 503, statusMessage: 'Admin credentials are not configured' })
  }

  return { adminUsername, adminPassword, adminSessionSecret }
}

async function sign(expiry: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(expiry))
  return Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join('')
}

export function verifyAdminCredentials(event: H3Event, username: string, password: string): boolean {
  const expected = getAdminConfig(event)
  return safeEqual(username, expected.adminUsername) && safeEqual(password, expected.adminPassword)
}

export async function createAdminSession(event: H3Event): Promise<void> {
  const { adminSessionSecret } = getAdminConfig(event)
  const expiry = String(Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS)

  setCookie(event, SESSION_COOKIE, `${expiry}.${await sign(expiry, adminSessionSecret)}`, {
    httpOnly: true,
    secure: getRequestURL(event).protocol === 'https:',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS
  })
}

export function clearAdminSession(event: H3Event): void {
  deleteCookie(event, SESSION_COOKIE, { path: '/' })
}

export async function requireAdminSession(event: H3Event): Promise<void> {
  const { adminSessionSecret } = getAdminConfig(event)
  const token = getCookie(event, SESSION_COOKIE)
  const [expiry, signature, extra] = token?.split('.') || []

  if (
    !expiry ||
    !signature ||
    extra ||
    !/^\d+$/.test(expiry) ||
    Number(expiry) <= Math.floor(Date.now() / 1000) ||
    !safeEqual(signature, await sign(expiry, adminSessionSecret))
  ) {
    throw createError({ statusCode: 401, statusMessage: 'Admin authentication required' })
  }
}
