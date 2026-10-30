import { readFileSync } from 'node:fs'

const words = JSON.parse(readFileSync(new URL('./public/static/data/words.json', import.meta.url), 'utf8')) as { id: string }[]
const authors = JSON.parse(readFileSync(new URL('./public/static/data/author-quotes.json', import.meta.url), 'utf8')) as { id: string; tr_quotes?: unknown }[]
const proverbs = JSON.parse(readFileSync(new URL('./public/static/data/preverbs.json', import.meta.url), 'utf8')) as { id: string }[]
const turkishWords = JSON.parse(readFileSync(new URL('./public/static/data/tr/kelimeler.json', import.meta.url), 'utf8')) as { id: string }[]
const authorsWithTurkishQuotes = authors.filter((author) => Array.isArray(author.tr_quotes) && author.tr_quotes.length > 0)

const siteUrl = 'https://wordsfromlife.com'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    adminUsername: '',
    adminPassword: '',
    adminSessionSecret: '',
    supabaseUrl: '',
    supabaseServiceRoleKey: ''
  },
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

  site: {
    url: siteUrl
  },

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
      { loc: '/', priority: 1.0 },
      { loc: '/about' },
      { loc: '/authors', priority: 0.8 },
      { loc: '/words', priority: 0.8 },
      { loc: '/preverbs', priority: 0.8 },
      { loc: '/tr/kelimeler' },
      { loc: '/tr/kisiler' },
      { loc: '/tr/kelimeler/fransizca-kokenli-turkce-kelimeler' },
      ...words.map((word) => ({ loc: `/words/${word.id}`, changefreq: 'weekly' as const })),
      ...authors.map((author) => ({ loc: `/authors/${author.id}-quotes`, changefreq: 'monthly' as const })),
      ...authorsWithTurkishQuotes.map((author) => ({ loc: `/tr/kisiler/${author.id}-sozleri`, changefreq: 'monthly' as const })),
      ...proverbs.map((proverb) => ({ loc: `/preverbs/${proverb.id}`, changefreq: 'monthly' as const })),
      ...turkishWords.map((word) => ({ loc: `/tr/kelimeler/${word.id}`, changefreq: 'monthly' as const }))
    ]
  },

  nitro: {
    prerender: {
      // Set crawlLinks to true so Nuxt automatically discovers linked dynamic routes
      crawlLinks: true,
      routes: [
        'https://wordsfromlife.com/',
        '/about',
        '/authors',
        '/preverbs',
        '/tr/kelimeler',
        '/tr/kisiler',
        '/tr/kelimeler/fransizca-kokenli-turkce-kelimeler',
        ...authors.map((author) => `/authors/${author.id}-quotes`),
        ...authorsWithTurkishQuotes.map((author) => `/tr/kisiler/${author.id}-sozleri`),
        ...proverbs.map((proverb) => `/preverbs/${proverb.id}`),
        ...turkishWords.map((word) => `/tr/kelimeler/${word.id}`)
      ],
      autoSubfolderIndex: false
    }
  },

  routeRules: {
    '/words': { prerender: false },
    '/words/**': { prerender: false },
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