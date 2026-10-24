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

const [words, authors, proverbs, turkishWords] = await Promise.all([
  loadJsonData<{ id: string }>('https://wordsfromlife.com/static/data/words.json'),
  loadJsonData<{ id: string }>('https://wordsfromlife.com/static/data/author-quotes.json'),
  loadJsonData<{ id: string }>('https://wordsfromlife.com/static/data/preverbs.json'),
  loadJsonData<{ id: string }>('https://wordsfromlife.com/static/data/tr/kelimeler.json')
])

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
   router: {
        options: {
            strict: true // Rotaların katı bir şekilde eşleşmesini sağlar
        }
    },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxtjs/sitemap'
  ],

  // Remove trailing slashes from generated NuxtLink URLs (except the root URL).
  experimental: {
    payloadExtraction: false,
    defaults: {
      nuxtLink: {
        trailingSlash: 'remove'
      }
    }
  },

  sitemap: {
    autoLastmod: true,
    urls: [
      { loc: 'https://wordsfromlife.com/', priority: 1.0 },
      { loc: 'https://wordsfromlife.com/authors', priority: 0.8 },
      { loc: 'https://wordsfromlife.com/words', priority: 0.8 },
      { loc: 'https://wordsfromlife.com/preverbs', priority: 0.8 },
      ...words.map((word) => ({ loc: `https://wordsfromlife.com/words/${word.id}`, changefreq: 'weekly' as const })),
      ...authors.map((author) => ({ loc: `https://wordsfromlife.com/authors/${author.id}-quotes`, changefreq: 'monthly' as const })),
      ...proverbs.map((proverb) => ({ loc: `https://wordsfromlife.com/preverbs/${proverb.id}`, changefreq: 'monthly' as const }))
    ]
  },

  nitro: {
    prerender: {
      // Set crawlLinks to true so Nuxt automatically discovers linked dynamic routes
      crawlLinks: true,
      routes: [
        '/',
        '/about',
        '/authors',
        '/authors/slug-backup',
        '/words',
        '/words/english-words-origin-french',
        '/preverbs',
        '/tr/kelimeler',
        '/tr/kelimeler/fransizca-kokenli-turkce-kelimeler',
        ...words.map((word) => `/words/${word.id}`),
        ...authors.map((author) => `/authors/${author.id}-quotes`),
        ...proverbs.map((proverb) => `/preverbs/${proverb.id}`),
        ...turkishWords.map((word) => `/tr/kelimeler/${word.id}`)
      ],
      autoSubfolderIndex: false
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