<template>
    <Navbar />
  <main class="main" role="main">
    <h1>Proverbs</h1>
    <div class="home-container words-container">
      <section class="section" id="word-container">
        <ul>
          <li v-for="item in words" :key="item.id">
            <NuxtLink :to="`/preverbs/${item.id}`">{{ item.preverb }}</NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useFetch } from '#imports'
import Navbar from '~/components/Navbar.vue'

const words = ref([])

// Fetch words data (SSR-friendly)
const { data: wordsData, pending, error } = await useFetch(
  'https://wordsfromlife.com/static/data/preverbs.json'
)
words.value = wordsData.value || []


</script>