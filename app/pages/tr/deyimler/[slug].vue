<template>
  <div>
    <Navbar_tr />

    <main v-if="idiom" class="idiom-detail">
      <header class="idiom-header">
        <p class="eyebrow">Türkçe Deyimler</p>
        <h1>{{ idiom.deyim }}</h1>
      </header>

      <article class="idiom-content">
        <img
          v-if="idiom.img"
          :src="useSitePath(idiom.img)"
          :alt="idiom.deyim"
          width="1000"
          height="1000"
        >
        <div v-html="useSiteHtml(idiom.icerik)" />
      </article>

      <NuxtLink to="/tr/deyimler" class="back-link">Tüm deyimleri görüntüle</NuxtLink>

      <nav class="breadcrumb" aria-label="Sayfa yolu">
        <ol>
          <li><NuxtLink to="/tr">Ana Sayfa</NuxtLink></li>
          <li><NuxtLink to="/tr/deyimler">Deyimler</NuxtLink></li>
          <li aria-current="page">{{ idiom.deyim }}</li>
        </ol>
      </nav>
    </main>

    <main v-else class="not-found">
      <h1>Deyim bulunamadı.</h1>
      <NuxtLink to="/tr/deyimler">Deyimler listesini görüntüle</NuxtLink>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from '#imports'
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const route = useRoute()
const slug = String(route.params.slug || '')

const { data: idiom } = await useAsyncData(`tr-idiom-${slug}`, async () => {
  const idioms = await $fetch(
    usePublicDataPath('https://wordsfromlife.com/static/data/tr/deyimler.json')
  )
  return idioms.find(item => String(item.id).toLocaleLowerCase('tr-TR') === slug.toLocaleLowerCase('tr-TR')) || null
})

useHead(() => {
  if (!idiom.value) return {}

  const path = `/tr/deyimler/${idiom.value.id}`
  return createPageSeoHead({
    title: `${idiom.value.deyim} Ne Demek?`,
    description: idiom.value.tr_meta_desc || `${idiom.value.deyim} deyiminin anlamı ve kullanımı.`,
    path,
    type: 'article',
    lang: 'tr',
    alternateLanguages: [
      { lang: 'tr', path },
      { lang: 'x-default', path }
    ],
    breadcrumbs: [
      { name: 'Ana Sayfa', path: '/tr' },
      { name: 'Deyimler', path: '/tr/deyimler' },
      { name: idiom.value.deyim, path }
    ]
  })
})
</script>

<style scoped>
.idiom-detail {
  max-width: 760px;
  margin: 0 auto;
  padding: 3rem 1.25rem 5rem;
  color: #29323b;
}

.idiom-header {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e8e3dc;
  text-align: center;
}

.eyebrow {
  margin: 0 0 0.75rem;
  color: #9a643e;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.idiom-header h1 {
  margin: 0;
  color: #202a33;
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  line-height: 1.12;
}

:deep(.idiom-content p),
:deep(.idiom-content li) {
  font-size: 1.05rem;
  line-height: 1.8;
}

:deep(.idiom-content p) {
  margin: 0 0 1.25rem;
}

.idiom-content > img {
  width: 100%;
  height: auto;
  margin-bottom: 1.5rem;
  border-radius: 8px;
}

:deep(.idiom-content p:first-child) {
  padding: 20px;
  border-left: 5px solid #d3d3d3;
  background-color: #f5f5f5;
}

:deep(.idiom-content h2),
:deep(.idiom-content h3) {
  margin: 2rem 0 1rem;
  color: #202a33;
}

:deep(.idiom-content ul) {
  margin: 0 0 1.5rem;
  padding-left: 1.5rem;
}

.back-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: #9a643e;
  font-weight: 700;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
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

.not-found {
  max-width: 760px;
  margin: 0 auto;
  padding: 4rem 1.25rem;
  text-align: center;
}

@media (max-width: 600px) {
  .idiom-detail {
    padding: 2rem 1rem 3.5rem;
  }
}
</style>
