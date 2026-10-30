import { defineEventHandler, getRouterParam } from 'h3'
import { fetchWordBySlug } from '../../utils/supabaseWords'

export default defineEventHandler(event => {
  const slug = getRouterParam(event, 'slug') || ''
  return fetchWordBySlug(event, slug)
})
