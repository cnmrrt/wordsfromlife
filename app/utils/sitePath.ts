export function useSitePath(path: string | null | undefined): string {
  if (!path || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) {
    return path || ''
  }

  const { app: { baseURL } } = useRuntimeConfig()
  return `${baseURL.replace(/\/?$/, '/')}${path.replace(/^\/+/, '')}`
}

export function usePublicDataPath(path: string): string {
  const siteOrigin = 'https://wordsfromlife.com'

  if (path.startsWith(`${siteOrigin}/`)) {
    return useSitePath(path.slice(siteOrigin.length))
  }

  return useSitePath(path)
}

export function useSiteHtml(html: string | null | undefined): string {
  if (!html) {
    return ''
  }

  const { app: { baseURL } } = useRuntimeConfig()
  const basePath = baseURL.replace(/\/?$/, '/')
  return html.replace(/(\b(?:href|src)\s*=\s*["'])\/(?!\/)/gi, `$1${basePath}`)
}
