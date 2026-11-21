<template>
  <div>
    <Navbar_tr />

    <main class="words-container">
      <header class="page-header">
        <h1>Bilim Dalları İsimleri</h1>
        <p class="intro">
          Bilim dallarına ait Türkçe kelimeler.
        </p>
        <label class="search-label" for="science-search">Kelime ara</label>
        <input
          id="science-search"
          v-model="searchQuery"
          class="search-input"
          type="search"
          placeholder="Bilim dalı adı ara"
        >
      </header>

      <section class="table-wrapper" aria-label="Bilim dalları isimleri">
        <p v-if="pending" class="status-message">Kelimeler yükleniyor…</p>
        <p v-else-if="error" class="status-message error-message" role="alert">
          Kelimeler yüklenemedi.
        </p>
        <table v-else class="words-table">
          <thead>
            <tr>
              <th scope="col">Kelime</th>
              <th scope="col">Açıklama</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredWords.length === 0">
              <td colspan="2" class="no-results">Aramanızla eşleşen kelime bulunamadı.</td>
            </tr>
            <tr v-for="item in filteredWords" :key="String(item.id)">
              <th scope="row" class="word-cell">
                <NuxtLink :to="`/tr/kelimeler/${item.id}`">{{ item.word }}</NuxtLink>
              </th>
              <td class="word-description">{{ item.description || 'Açıklama bulunamadı.' }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const searchQuery = ref('')

const { data: wordsData, pending, error } = await useFetch(
  '/api/tr/words/by-tag/branch_of_science'
)

const words = computed(() => wordsData.value || [])
const filteredWords = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('tr-TR')
  if (!query) return words.value

  return words.value.filter(item =>
    String(item.word || '').toLocaleLowerCase('tr-TR').includes(query)
  )
})

useHead(createPageSeoHead({
  title: 'Bilim Dalları İsimleri',
  description: 'Türkçe bilim dalları isimlerini tr_words veritabanından keşfedin.',
  path: '/tr/kelimeler/bilim-dallari-isimleri',
  type: 'article',
  lang: 'tr',
  breadcrumbs: [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Kelimeler', path: '/tr/kelimeler' },
    { name: 'Bilim Dalları İsimleri', path: '/tr/kelimeler/bilim-dallari-isimleri' }
  ]
}))
</script>

<style scoped>
.words-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
}

.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.page-header h1 {
  margin: 0 auto 0.75rem;
  color: #1e293b;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  line-height: 1.2;
}

.intro {
  max-width: 720px;
  margin: 0 auto 1.5rem;
  color: #64748b;
  font-size: 1.05rem;
  line-height: 1.7;
}

.search-label {
  display: block;
  margin-bottom: 0.35rem;
  color: #334155;
  font-size: 0.9rem;
  font-weight: 600;
}

.search-input {
  width: 100%;
  max-width: 440px;
  padding: 0.7rem 0.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font: inherit;
}

.search-input:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.words-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.words-table th,
.words-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  line-height: 1.6;
}

.words-table thead th {
  background: #f8fafc;
  color: #334155;
  font-size: 0.9rem;
}

.words-table tbody tr:last-child th,
.words-table tbody tr:last-child td {
  border-bottom: 0;
}

.word-cell {
  color: #1e293b;
  min-width: 180px;
  font-weight: 700;
}

.word-description {
  color: #475569;
  line-height: 1.7;
}

.word-cell a {
  color: inherit;
  text-decoration: none;
}

.word-cell a:hover {
  text-decoration: underline;
}

.no-results,
.status-message {
  padding: 1.5rem;
  color: #64748b;
  text-align: center;
}

.error-message {
  color: #b91c1c;
}
</style>
