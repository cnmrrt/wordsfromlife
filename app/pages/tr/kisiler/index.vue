<template>
  <div>
    <Navbar_tr />
    <main class="main" role="main">
      <h1>Yazarlar</h1>
      <div class="authors-container">
        <section class="authors-grid">
          <NuxtLink
            v-for="author in authors"
            :key="author.id"
            class="author-card"
            :to="`/tr/kisiler/${author.id}-quotes`"
          >
            <img
              v-if="author.img"
              :src="useSitePath(author.img)"
              :alt="`${author.name} ${author.surname}`.trim()"
              :width="author.img_width"
              :height="author.img_height"
            >
            <span>{{ author.name }} {{ author.surname }}</span>
          </NuxtLink>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const { data: authorsData } = await useFetch(
  usePublicDataPath('https://wordsfromlife.com/static/data/author-quotes.json')
)

const authors = computed(() => (authorsData.value || [])
  .filter(author => Array.isArray(author.tr_quotes) && author.tr_quotes.length > 0)
  .sort((a, b) => `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`, 'tr')))

useHead(createPageSeoHead({
  title: 'Yazarlar',
  description: 'Ünlü yazarların ve düşünürlerin ilham veren sözlerini keşfedin.',
  path: '/tr/kisiler',
  lang: 'tr',
  alternateLanguages: [
    { lang: 'en', path: '/authors' },
    { lang: 'tr', path: '/tr/kisiler' },
    { lang: 'x-default', path: '/authors' }
  ],
  breadcrumbs: [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Yazarlar', path: '/tr/kisiler' }
  ]
}))
</script>

<style scoped>
.main {
  padding: 2rem 0;
}

.authors-container {
  max-width: 1128px;
  margin: 0 auto;
  padding: 0 24px;
}

.authors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  padding: 1rem 0 3rem;
}

.author-card {
  overflow: hidden;
  border: 2px solid #eee;
  border-radius: 8px;
  color: #222;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.author-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.author-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.author-card span {
  display: block;
  padding: 0.6rem 0.25rem;
}

@media (max-width: 767px) {
  .authors-container {
    padding: 0 12px;
  }
}
</style>
