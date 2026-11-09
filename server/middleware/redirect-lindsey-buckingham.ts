import { getRequestURL, sendRedirect } from 'h3'

export default defineEventHandler((event) => {
  const requestUrl = getRequestURL(event)

  if (requestUrl.pathname === '/' && requestUrl.searchParams.get('a') === 'Lindsey Buckingham') {
    return sendRedirect(event, '/', 301)
  }
})
