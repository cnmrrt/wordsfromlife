<template>
    <Navbar_tr />
  <main class="main" role="main">
    <h1>Kelimeler</h1>
    <div class="home-container words-container">
      <section class="section" id="word-container">
        <ul>
          <li v-for="item in words" :key="item.id">
            <NuxtLink :to="`/tr/kelimeler/${item.id}`">{{ item.word }}</NuxtLink>
          </li>
        </ul>
        <hr style="border-width: 1px 0px 0px; border-style: solid; border-left-color: currentcolor; border-right-color: currentcolor; color: rgb(211, 211, 211) !important; border-bottom-color: currentcolor; margin: 2rem 0px;">
        <p><a href="https://wordsfromlife.com/tr/kelimeler/fransizca-kokenli-turkce-kelimeler">Fransızca Kökenli Türkçe Kelimeler</a></p>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '#imports'
import Navbar_tr from '~/components/Navbar_tr.vue'

const words = ref([])

// Fetch words data (SSR-friendly)
const { data: wordsData, pending, error } = await useFetch(
  'https://wordsfromlife.com/static/data/tr/kelimeler.json'
)

if (wordsData.value) {
  // Convert object to array (if Firebase returns an object)
  const arr = Array.isArray(wordsData.value)
    ? wordsData.value
    : Object.entries(wordsData.value).map(([id, item]) => ({
        id,
        ...item
      }))

  // Sort alphabetically by 'word'
  words.value = arr.sort((a, b) => a.word.localeCompare(b.word, 'en', { sensitivity: 'base' }))
}

useHead({
  htmlAttrs: {
        lang: 'tr'
    },
  title: 'Kelimeler',
  meta: [
    {
      name: 'description',
      content: 'Kelimeler'
    },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: 'Kelimeler' },
    {
      property: 'og:description',
      content: 'Kelimeler'
    },
    { property: 'og:url', content: 'https://wordsfromlife.com/tr/kelimeler' }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://wordsfromlife.com/tr/kelimeler'
    }
  ]
})
</script>
