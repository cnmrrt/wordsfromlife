<template>
  <div>
    <Navbar_tr />
    <main class="main" role="main">
      <h1>Kelimeler</h1>
      <div class="home-container words-container">
        <section id="word-container" class="section">
          <ul>
            <li v-for="item in words" :key="item.id">
              <NuxtLink :to="`/tr/kelimeler/${item.id}`">{{ item.word }}</NuxtLink>
            </li>
          </ul>
          <hr style="border-width: 1px 0px 0px; border-style: solid; border-left-color: currentcolor; border-right-color: currentcolor; color: rgb(211, 211, 211) !important; border-bottom-color: currentcolor; margin: 2rem 0px;">
          <p><NuxtLink to="/tr/kelimeler/fransizca-kokenli-turkce-kelimeler">Fransızca Kökenli Türkçe Kelimeler</NuxtLink></p>
          <p><NuxtLink to="/tr/kelimeler/turkcede-en-cok-yapilan-yazim-hatalari">Türkçe'de En Çok Yapılan Yazım Hataları</NuxtLink></p>
          <p><NuxtLink to="/tr/kelimeler/turkcedeki-es-anlamli-kelimeler">Türkçedeki Eş Anlamlı Kelimeler</NuxtLink></p>
          <p><NuxtLink to="/tr/kelimeler/turkcedeki-zit-anlamli-kelimeler">Türkçedeki Zıt Anlamlı Kelimeler</NuxtLink></p>
          <p><NuxtLink to="/tr/kelimeler/sivas-yoresel-kelimeler">Sivas Yöresel Kelimeleri</NuxtLink></p>
          <p><NuxtLink to="/tr/kelimeler/osmanlica-kelimeler">Osmanlıca Kelimeler ve Anlamları</NuxtLink></p>
          <p><NuxtLink to="/tr/kelimeler/bilim-dallari-isimleri">Bilim Dalları İsimleri</NuxtLink></p>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFetch } from '#imports'
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const { data: wordsData } = await useFetch('/api/tr/words')
const words = computed(() => wordsData.value || [])

useHead(createPageSeoHead({
  title: 'Kelimeler',
  description: 'Türkçe kelimelerin anlamlarını ve kökenlerini keşfedin.',
  path: '/tr/kelimeler',
  lang: 'tr',
  breadcrumbs: [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Kelimeler', path: '/tr/kelimeler' }
  ]
}))
</script>
