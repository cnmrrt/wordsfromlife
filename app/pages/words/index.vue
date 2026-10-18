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
        <p><NuxtLink to="/words/english-words-origin-french">English Words of French Origin</NuxtLink></p>
        <hr style="border-left: 0; border-right: 0; color: #d3d3d3 !important; border-bottom: 0; border-style: solid; border-top-width: 1px; margin: 2rem 0;">
        <p><NuxtLink to="/words/english-synonym-words">English Synonym Words</NuxtLink></p>
      </section>
    </div>
  </main>""
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '#imports'
import Navbar from '~/components/Navbar.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const words = ref([])

// Fetch words data (SSR-friendly)
const { data: wordsData, pending, error } = await useFetch(
  usePublicDataPath('https://wordsfromlife.com/static/data/words.json')
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

useHead(createPageSeoHead({
  title: 'Words',
  description: 'Explore meaningful English words, their definitions, origins, and context.',
  path: '/words',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Words', path: '/words' }
  ]
}))
</script>
