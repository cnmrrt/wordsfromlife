<template>
    <Navbar />
  <main class="main" role="main">
    <h1>Words</h1> 
    <div class="home-container words-container">
      <section class="section" id="word-container">
        <p v-if="wordsError" role="alert">Words are temporarily unavailable.</p>
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
  </main>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const { data: words, error: wordsError } = await useFetch('/api/words', {
  default: () => []
})

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
