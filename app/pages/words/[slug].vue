<template>
  <Navbar />

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
import Navbar from '~/components/Navbar.vue'
import { useRoute, useHead } from '#imports'
import { createPageSeoHead } from '~/utils/pageSeo'

const route = useRoute()
const slug = route.params.slug

const { data: word } = await useAsyncData(`word-${slug}`, async () => {
  const res = await $fetch(usePublicDataPath('https://wordsfromlife.com/static/data/words.json'))
  return res.find(item => item.id?.toLowerCase() === slug.toLowerCase())
})

useHead(() => {
  if (!word.value) return {}
  const title = `Meaning of ${word.value.word}`
  const path = `/words/${word.value.id}`
  return createPageSeoHead({
    title,
    description: word.value.en_meta_desc || `Learn the meaning and origin of ${word.value.word}.`,
    path,
    image: word.value.img,
    type: 'article',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Words', path: '/words' },
      { name: word.value.word, path }
    ]
  })
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
:global(.word-detail-main a) {text-decoration: underline !important; color: blue !important;}
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
:global(.word-detail-main h3) {margin-top: 2rem;}
</style>
