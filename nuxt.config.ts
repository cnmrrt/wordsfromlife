const words = await import('./public/static/data/words.json', { with: { type: 'json' } }).then((m) => m.default || m)
const authors = await import('./public/static/data/author-quotes.json', { with: { type: 'json' } }).then((m) => m.default || m)
const proverbs = await import('./public/static/data/preverbs.json', { with: { type: 'json' } }).then((m) => m.default || m)

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

  sitemap: {
    autoLastmod: true,

    urls: async () => {
      const wordItems = Array.isArray(words) ? words : []
      const authorItems = Array.isArray(authors) ? authors : []
      const proverbItems = Array.isArray(proverbs) ? proverbs : []

      return [
        { loc: '/', priority: 1.0 },
        { loc: '/authors', priority: 0.8 },
        { loc: '/words', priority: 0.8 },
        { loc: '/preverbs', priority: 0.8 },
        ...wordItems.map((w: any) => ({ loc: `/words/${w.id}`, changefreq: 'weekly' })),
        ...authorItems.map((a: any) => ({ loc: `/authors/${a.id}-quotes`, changefreq: 'monthly' })),
        ...proverbItems.map((p: any) => ({ loc: `/preverbs/${p.id}`, changefreq: 'monthly' }))
      ]
    }
  },

  routeRules: {
    // Single page 301 redirect
    '/authors/a/albert-camus-quotes': { redirect: { to: '/authors/albert-camus-quotes', statusCode: 301 } },
    '/author.php': { redirect: { to: '/', statusCode: 301 } }
    // // Wildcard / dynamic redirect
    // '/blog/**': { 
    //   redirect: { to: '/articles/**', statusCode: 301 } 
    // }
  },

  css: [
    '~/assets/css/style.css'
  ],

  app: {
    head: {
      script: [
        {
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5581015881313741",
          async: true,
          crossorigin: "anonymous"
        },
      ]
    }
  },

})
