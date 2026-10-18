<template>
  <Navbar_tr />

  <div v-if="word" class="word-detail-container">
    <main class="word-detail-main">
      <h1>{{ word.word }}</h1>

      <div id="main-image" v-if="word.img">
        <img
          :src="useSitePath(word.img)"
          :alt="word.word"
          :width="word.img_width"
          :height="word.img_height"
        />
      </div>

      <!-- renders immediately after SSR -->
      <div v-html="useSiteHtml(word.content)"></div>
      
    </main>
  </div>

  <div v-else class="error">
    Word not found.
  </div>
</template>

<script setup>
import Navbar_tr from '~/components/Navbar_tr.vue'
import { useRoute, useHead } from '#imports'

const route = useRoute()
const slug = route.params.slug

const { data: word } = await useAsyncData(`word-${slug}`, async () => {
  const res = await $fetch(usePublicDataPath('/static/data/tr/kelimeler.json'))
  return res.find(item => item.id?.toLowerCase() === slug.toLowerCase())
})


let pageTitle;
if (route.path === '/tr/kelimeler/sittin-sene') {
  pageTitle = 'Sittin Sene Ne Demek? - Words From Life';
} /*else if (currentUrl === 'https://example.com/def') {
  pageTitle = 'DEF';
}*/ else {
  pageTitle = word.value ? `${word.value.word} Anlamı | Words From Life` : 'Word Not Found | Words From Life';
}

useHead(() => {
  if (!word.value) return {}
  return {
    htmlAttrs: {
        lang: 'tr'
    },
    title: pageTitle,
    meta: [
      { name: 'description', content: word.value.en_meta_desc || '' },
      { property: 'og:type', content: `article` },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: word.value.en_meta_desc || '' },
      { property: 'og:image', content: `https://wordsfromlife.com/tr/kelimeler/${word.value.img}` || '' },
      { property: 'og:url', content: `https://wordsfromlife.com/tr/kelimeler/${word.value.id}` }
    ],
    link: [
        {
          rel: 'canonical',
          href: `https://wordsfromlife.com/tr/kelimeler/${word.value.id}`
        }
      ]
  }
})
</script>

<style scoped>
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #e74c3c;
}
.word-detail-container {
  max-width: 80%;
  margin: 0 auto;
  padding: 0;
}
.word-detail-main {
  max-width: 600px;
  margin: 0 auto;
}
.word-detail-main h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}
#main-image {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}
#main-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.word-detail-main p {
  line-height: 1.6;
  margin: 1rem 0;
}
</style>
