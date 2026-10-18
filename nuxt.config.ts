import fs from 'node:fs'
import path from 'node:path'

// Robust helper to read JSON files safely relative to project root
function loadJsonData(relativePath: string) {
  try {
    const fullPath = path.resolve(process.cwd(), relativePath)
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      const data = JSON.parse(content)
      return Array.isArray(data) ? data : []
    }
  } catch (error) {
    console.error(`Failed to load JSON from ${relativePath}:`, error)
  }
  return []
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxtjs/sitemap'
  ],

  // Configure global trailing slash removal
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'remove'
      }
    }
  },

  router: {
    options: {
      trailingSlash: false
    }
  },

  sitemap: {
    autoLastmod: true,
    urls: async () => {
      const words = loadJsonData('public/static/data/words.json')
      const authors = loadJsonData('public/static/data/author-quotes.json')
      const proverbs = loadJsonData('public/static/data/preverbs.json')

      return [
        { loc: '/', priority: 1.0 },
        { loc: '/authors', priority: 0.8 },
        { loc: '/words', priority: 0.8 },
        { loc: '/preverbs', priority: 0.8 },
        ...words.map((w: any) => ({ loc: `/words/${w.id}`, changefreq: 'weekly' })),
        ...authors.map((a: any) => ({ loc: `/authors/${a.id}-quotes`, changefreq: 'monthly' })),
        ...proverbs.map((p: any) => ({ loc: `/preverbs/${p.id}`, changefreq: 'monthly' }))
      ]
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: () => {
        const words = loadJsonData('public/static/data/words.json')
        const authors = loadJsonData('public/static/data/author-quotes.json')
        const proverbs = loadJsonData('public/static/data/preverbs.json')
        const turkishWords = loadJsonData('public/static/data/tr/kelimeler.json')

        return [
          '/',
          '/about',
          '/authors',
          '/authors/slug-backup',
          '/words',
          '/words/english-words-origin-french',
          '/preverbs',
          '/tr/kelimeler',
          '/tr/kelimeler/fransizca-kokenli-turkce-kelimeler',
          ...words.map((w: any) => `/words/${w.id}`),
          ...authors.map((a: any) => `/authors/${a.id}-quotes`),
          ...proverbs.map((p: any) => `/preverbs/${p.id}`),
          ...turkishWords.map((w: any) => `/tr/kelimeler/${w.id}`)
        ]
      }
    }
  },

  routeRules: {
    '/authors/a/albert-camus-quotes': { redirect: { to: '/authors/albert-camus-quotes', statusCode: 301 } },
    '/author.php': { redirect: { to: '/', statusCode: 301 } }
  },

  css: [
    '~/assets/css/style.css'
  ],

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      script: [
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5581015881313741',
          async: true,
          crossorigin: 'anonymous'
        }
      ]
    }
  }
})