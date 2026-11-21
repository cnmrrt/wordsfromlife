<template>
  <div>
    <Navbar_tr />

    <main class="idioms-page">
      <header class="idioms-header">
        <h1>Türkçe Deyimler</h1>
        <p>Türkçedeki deyimlerin anlamlarını, kullanım özelliklerini ve örneklerini keşfedin.</p>

        <label for="idiom-search">Deyim ara</label>
        <input
          id="idiom-search"
          v-model="searchQuery"
          type="search"
          placeholder="Deyim adı ara"
        >
      </header>

      <section class="idioms-list" aria-label="Türkçe deyimler">
        <NuxtLink
          v-for="idiom in filteredIdioms"
          :key="idiom.id"
          :to="`/tr/deyimler/${idiom.id}`"
          class="idiom-card"
        >
          <h2>{{ idiom.deyim }}</h2>
          <p>{{ firstParagraph(idiom.icerik) }}</p>
          <span>Deyimi incele <span aria-hidden="true">→</span></span>
        </NuxtLink>

        <p v-if="filteredIdioms.length === 0" class="no-results">
          Aramanızla eşleşen deyim bulunamadı.
        </p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const searchQuery = ref('')
const { data: idioms } = await useFetch(
  usePublicDataPath('https://wordsfromlife.com/static/data/tr/deyimler.json')
)

const filteredIdioms = computed(() => {
  const list = Array.isArray(idioms.value) ? idioms.value : []
  const query = searchQuery.value.trim().toLocaleLowerCase('tr-TR')
  if (!query) return list

  return list.filter(idiom =>
    `${idiom.deyim} ${idiom.tr_meta_desc || ''}`
      .toLocaleLowerCase('tr-TR')
      .includes(query)
  )
})

function firstParagraph(html) {
  if (typeof html !== 'string') return ''
  const match = html.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)
  if (!match?.[1]) return ''

  return match[1]
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

useHead(createPageSeoHead({
  title: 'Türkçe Deyimler ve Anlamları',
  description: 'Türkçe deyimlerin anlamlarını, kullanım özelliklerini ve örneklerini inceleyin.',
  path: '/tr/deyimler',
  lang: 'tr',
  alternateLanguages: [
    { lang: 'tr', path: '/tr/deyimler' },
    { lang: 'x-default', path: '/tr/deyimler' }
  ],
  breadcrumbs: [
    { name: 'Ana Sayfa', path: '/tr' },
    { name: 'Deyimler', path: '/tr/deyimler' }
  ]
}))
</script>

<style scoped>
.idioms-page {
  width: min(1000px, 100%);
  margin: 0 auto;
  padding: 3rem 1.25rem 5rem;
}

.idioms-header {
  max-width: 700px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.idioms-header h1 {
  margin: 0 0 0.75rem;
  color: #202a33;
  font-size: clamp(2rem, 5vw, 3rem);
}

.idioms-header p {
  margin: 0 0 1.25rem;
  color: #64748b;
  line-height: 1.7;
}

.idioms-header label {
  display: block;
  margin-bottom: 0.35rem;
  color: #334155;
  font-size: 0.9rem;
  font-weight: 700;
  text-align: left;
}

.idioms-header input {
  width: 100%;
  min-height: 44px;
  padding: 0.7rem 0.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font: inherit;
}

.idioms-header input:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}

.idioms-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1rem;
}

.idiom-card {
  display: flex;
  min-height: 220px;
  flex-direction: column;
  padding: 1.25rem;
  border: 1px solid #e8e3dc;
  border-radius: 8px;
  color: inherit;
  text-decoration: none;
  transition: box-shadow 0.2s, transform 0.2s;
}

.idiom-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgb(32 42 51 / 10%);
}

.idiom-card h2 {
  margin: 0 0 0.75rem;
  color: #202a33;
  font-size: 1.35rem;
}

.idiom-card p {
  margin: 0 0 1.25rem;
  color: #4a5661;
  line-height: 1.7;
}

.idiom-card > span {
  margin-top: auto;
  color: #9a643e;
  font-weight: 700;
}

.no-results {
  grid-column: 1 / -1;
  color: #64748b;
  text-align: center;
}

@media (max-width: 600px) {
  .idioms-page {
    padding: 2rem 1rem 3.5rem;
  }
}
</style>
