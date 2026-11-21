<template>
  <div>
    <Navbar_tr />

    <div v-if="word" class="word-detail-container">
      <main class="word-detail-main">
        <h1>{{ word.word }}</h1>

        <div v-if="word.img" id="main-image">
          <img :src="useSitePath(word.img)" :alt="word.word" :width="word.img_width" :height="word.img_height" >
        </div>

        <div v-html="useSiteHtml(word.content)" />

        <nav class="breadcrumb" aria-label="Sayfa yolu">
          <ol>
            <li><NuxtLink to="/tr">Ana Sayfa</NuxtLink></li>
            <li><NuxtLink to="/tr/kelimeler">Kelimeler</NuxtLink></li>
            <li aria-current="page">{{ word.word }}</li>
          </ol>
        </nav>
      </main>
    </div>

    <div v-else class="error">
      Word not found.
    </div>
  </div>
</template>

<script setup>
import Navbar_tr from '~/components/Navbar_tr.vue'
import { useRoute, useHead } from '#imports'
import { createPageSeoHead } from '~/utils/pageSeo'

const route = useRoute()
const slug = route.params.slug

const { data: word } = await useAsyncData(`word-${slug}`, async () => {
  return await $fetch(`/api/tr/words/${encodeURIComponent(String(slug))}`)
})


let pageTitle;
if (route.path === '/tr/kelimeler/sittin-sene') {
  pageTitle = 'Sittin Sene Ne Demek? - Words From Life';
} else if (route.path === '/tr/kelimeler/yali') {
  pageTitle = 'Yalı Kelimesi Nereden Geliyor? | Words From Life';
} else if (route.path === '/tr/kelimeler/tahayyul') {
  pageTitle = 'Tahayyül Ne Demek? | Words From Life';
} else if (route.path === '/tr/kelimeler/ahali') {
  pageTitle = 'Ahali Sözlük Anlamı | Words From Life';
} else if (route.path === '/tr/kelimeler/aforizma') {
  pageTitle = 'Aforizma Ne Demek? | Words From Life';
} else if (route.path === '/tr/kelimeler/bohem') {
  pageTitle = 'Bohem Ne Demek? | Words From Life';
} else if (route.path === '/tr/kelimeler/alelade') {
  pageTitle = 'Alelade Ne Demek? | Words From Life';
} else if (route.path === '/tr/kelimeler/filoloji') {
  pageTitle = 'Filoloji Nedir ve Neyi Araştırır? | Words From Life';
} else if (route.path === '/tr/kelimeler/antropoloji') {
  pageTitle = 'Antropoloji Nedir ve Neyi Araştırır? | Words From Life';
} else if (route.path === '/tr/kelimeler/etnoloji') {
  pageTitle = 'Etnoloji Nedir ve Neyi Araştırır? | Words From Life';
} else if (route.path === '/tr/kelimeler/sosyoloji') {
  pageTitle = 'Sosyoloji Nedir ve Neyi Araştırır? | Words From Life';
} else if (route.path === '/tr/kelimeler/ekoloji') {
  pageTitle = 'Ekoloji Nedir ve Neyi Araştırır? | Words From Life';
} else {
  pageTitle = word.value ? `${word.value.word} Anlamı | Words From Life` : 'Word Not Found | Words From Life';
}

useHead(() => {
  if (!word.value) return {}
  const path = `/tr/kelimeler/${word.value.id}`
  return createPageSeoHead({
    title: pageTitle,
    description: word.value.en_meta_desc || `${word.value.word} kelimesinin anlamı ve kökeni.`,
    path,
    image: word.value.img,
    type: 'article',
    lang: 'tr',
    breadcrumbs: [
      { name: 'Ana Sayfa', path: '/tr' },
      { name: 'Kelimeler', path: '/tr/kelimeler' },
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

#main-image {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

#main-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.word-detail-main p {
  line-height: 1.6;
  margin: 1rem 0;
}

.breadcrumb {
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid #e8e3dc;
}

.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  color: #64748b;
  font-size: 0.9rem;
}

.breadcrumb li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb li:not(:last-child)::after {
  content: "/";
  color: #94a3b8;
}

.breadcrumb a {
  color: #9a643e;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb [aria-current="page"] {
  color: #29323b;
  font-weight: 600;
}
</style>
