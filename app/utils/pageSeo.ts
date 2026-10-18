const siteOrigin = 'https://wordsfromlife.com'
const defaultOgImage = '/static/img/newspaper-bg.jpg'

type Breadcrumb = {
  name: string
  path: string
}

type PageSeoOptions = {
  title: string
  description: string
  path: string
  breadcrumbs: Breadcrumb[]
  image?: string
  type?: 'article' | 'website'
  lang?: string
  bodyAttrs?: { id?: string }
}

export function createPageSeoHead({
  title,
  description,
  path,
  breadcrumbs,
  image,
  type = 'website',
  lang,
  bodyAttrs
}: PageSeoOptions) {
  const canonicalUrl = new URL(path, siteOrigin).href
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: new URL(breadcrumb.path, siteOrigin).href
    }))
  }

  return {
    ...(lang ? { htmlAttrs: { lang } } : {}),
    ...(bodyAttrs ? { bodyAttrs } : {}),
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'Words From Life' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: new URL(image || defaultOgImage, siteOrigin).href }
    ],
    link: [{ rel: 'canonical', href: canonicalUrl }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c')
      }
    ]
  }
}
