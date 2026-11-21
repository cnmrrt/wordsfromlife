import { createError, defineEventHandler, getRouterParam } from 'h3'
import { fetchWordsByTag } from '../../../../utils/supabaseWords'

export default defineEventHandler((event) => {
  const tag = getRouterParam(event, 'tag') || ''
  if (!tag || tag.length > 100) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid tag' })
  }

  return fetchWordsByTag(event, tag, 'tr_words')
})
