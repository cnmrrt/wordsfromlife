<template>
  <div>
    <Navbar_tr />

    <div v-if="author" class="background-image" :style="{ '--bg-image': `url(${useSitePath(author.img)})` }">
      <main class="author-content">
        <h1>{{ author.name }} {{ author.surname }} Sözleri</h1>
        <q v-for="(quote, index) in author.tr_quotes" :key="index" v-html="useSiteHtml(quote)" />
        <span class="author-name">{{ author.name }} {{ author.surname }}</span>
        <span class="author-dates">{{ author.born }} - {{ author.dead }}</span>
      </main>
    </div>

    <main v-else class="not-found">
      <p>Yazar bulunamadı.</p>
      <NuxtLink to="/tr/kisiler">Tüm yazarları görüntüle</NuxtLink>
    </main>
  </div>
</template>

<script setup>
import Navbar_tr from '~/components/Navbar_tr.vue'
import { useRoute } from '#imports'
import { createPageSeoHead } from '~/utils/pageSeo'

const route = useRoute()
const slug = route.params.slug

const { data: author } = await useAsyncData(`tr-author-${slug}`, async () => {
  const allAuthors = await $fetch(usePublicDataPath('https://wordsfromlife.com/static/data/author-quotes.json'))
  return allAuthors.find(item =>
    `${item.id}-quotes`.toLowerCase() === slug.toLowerCase() &&
    Array.isArray(item.tr_quotes) &&
    item.tr_quotes.length > 0
  )
})

if (author.value) {
  const authorName = `${author.value.name} ${author.value.surname}`.trim()
  const path = `/tr/kisiler/${author.value.id}-quotes`

  useHead(createPageSeoHead({
    title: `${authorName} Sözleri`,
    description: author.value.tr_meta_desc || `${authorName} tarafından söylenmiş ilham verici sözler.`,
    path,
    alternateLanguages: [
      { lang: 'en', path: `/authors/${author.value.id}-quotes` },
      { lang: 'tr', path },
      { lang: 'x-default', path: `/authors/${author.value.id}-quotes` }
    ],
    image: author.value.img,
    type: 'article',
    lang: 'tr',
    bodyAttrs: { id: 'tr-author-page-body' },
    breadcrumbs: [
      { name: 'Ana Sayfa', path: '/' },
      { name: 'Yazarlar', path: '/tr/kisiler' },
      { name: `${authorName} Sözleri`, path }
    ]
  }))
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap');

:global(body#tr-author-page-body) {
  background-color: #000;
  font-family: "Gochi Hand", cursive;
}

:global(body#tr-author-page-body nav) {
  background: none;
  border: none;
}

:global(body#tr-author-page-body nav a) {
  color: #fff;
}

.background-image::after {
  position: fixed;
  z-index: -1;
  inset: 0;
  background: var(--bg-image) center / cover no-repeat;
  content: "";
  opacity: 0.4;
}

.author-content {
  position: relative;
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 1rem;
  color: #fff;
  font-family: "Gochi Hand", cursive;
}

.author-content h1 {
  color: #fff;
}

.author-content q {
  display: block;
  margin: 30px 0;
  color: #fff;
  font-size: 40px;
  text-align: center;
}

.author-content :deep(a) {
  color: #6495ed;
  text-decoration: underline;
}

.author-name,
.author-dates {
  display: block;
  color: #fff;
  text-align: right;
}

.author-name {
  font-size: 30px;
}

.not-found {
  padding: 2rem;
  text-align: center;
}

@media (max-width: 576px) {
  .author-content q {
    font-size: 20px;
  }
}
</style>
