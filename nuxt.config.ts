// Helper function to dynamically import JSON data safely
async function loadJsonData<T>(path: string): Promise<T[]> {
  try {
    const module = await import(path, { with: { type: 'json' } })
    const data = module.default || module
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error(`Failed to load JSON from ${path}:`, error)
    return []
  }
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

  // Configure trailing slash behavior globally
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
      const [words, authors, proverbs] = await Promise.all([
        loadJsonData<any>('./public/static/data/words.json'),
        loadJsonData<any>('./public/static/data/author-quotes.json'),
        loadJsonData<any>('./public/static/data/preverbs.json')
      ])

      return [
        { loc: '/', priority: 1.0 },
        { loc: '/authors', priority: 0.8 },
        { loc: '/words', priority: 0.8 },
        { loc: '/preverbs', priority: 0.8 },
        ...words.map((w) => ({ loc: `/words/${w.id}`, changefreq: 'weekly' })),
        ...authors.map((a) => ({ loc: `/authors/${a.id}-quotes`, changefreq: 'monthly' })),
        ...proverbs.map((p) => ({ loc: `/preverbs/${p.id}`, changefreq: 'monthly' }))
      ]
    }
  },

  nitro: {
    prerender: {
      // Set crawlLinks to true so Nuxt automatically discovers linked dynamic routes
      crawlLinks: true,
      routes: async () => {
        const [words, authors, proverbs, turkishWords] = await Promise.all([
          loadJsonData<any>('./public/static/data/words.json'),
          loadJsonData<any>('./public/static/data/author-quotes.json'),
          loadJsonData<any>('./public/static/data/preverbs.json'),
          loadJsonData<any>('./public/static/data/tr/kelimeler.json')
        ])

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
          ...words.map((w) => `/words/${w.id}`),
          ...authors.map((a) => `/authors/${a.id}-quotes`),
          ...proverbs.map((p) => `/preverbs/${p.id}`),
          ...turkishWords.map((w) => `/tr/kelimeler/${w.id}`)
        ]
      }
    }
  },

  routeRules: {
    // Single page 301 redirects
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