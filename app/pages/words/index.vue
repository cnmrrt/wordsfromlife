<template>
    <Navbar />
  <main class="main" role="main">
    <h1>Words</h1>
    <div class="home-container words-container">
      <section class="section" id="word-container">
        <ul>
          <li v-for="item in words" :key="item.id">
            <NuxtLink :to="`/words/${item.id}`">{{ item.word }}</NuxtLink>
          </li>
        </ul>
        <hr style="border-left: 0; border-right: 0; color: #d3d3d3 !important; border-bottom: 0; border-style: solid; border-top-width: 1px; margin: 2rem 0;">
        <p><a href="https://wordsfromlife.com/words/english-words-origin-french">English Words of French Origin</a></p>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '#imports'
import Navbar from '~/components/Navbar.vue'

const words = ref([])

// Fetch words data (SSR-friendly)
const { data: wordsData, pending, error } = await useFetch(
  'https://wordsfromlife.com/static/data/words.json'
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
  title: 'Words',
  meta: [
    {
      name: 'description',
      content: 'Words'
    },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: 'Words' },
    {
      property: 'og:description',
      content: 'Words'
    },
    { property: 'og:url', content: 'https://wordsfromlife.com/words' }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://wordsfromlife.com/words'
    }
  ]
})
</script>
