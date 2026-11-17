<template>
  <div>
    <Navbar_tr />

    <div v-if="author" class="background-image" :style="{ '--bg-image': `url(${useSitePath(author.img)})` }">
      <main class="author-content">
        <h1>{{ author.name }} {{ author.surname }} Sözleri</h1>
        <q v-for="(quote, index) in author.tr_quotes" :key="index" v-html="useSiteHtml(quote)" />
        <span class="author-name">{{ author.name }} {{ author.surname }}</span>
        <span class="author-dates">{{ author.born }} - {{ author.dead }}</span>



        <div v-if="route.path === '/tr/kisiler/salvador-dali-sozleri'">
          <br /><br />
          <p>Tam adı Salvador Domingo Felipe Jacinto Dalí i Domènech olan, kısaca Salvador Dali olarak bilinen Katalonya
            doğumlu İspanyol ressam gerçeküstü eserleriyle tanınmıştır.</p>
          <p>Ressamlığıyla birlikte fotoğrafçılık, heykelcilik ve filmcilikle de uğraşan Dali eserlerindeki tuhaf ve
            çarpıcı imgelerle ününe kavuşmuştur.</p>
          <p>Sanatının dışında giyimi, davranışları ve sözleriyle de dikkat çeken Salvador Dali tuhaf olduğunu
            sözleriyle de belirtmiştir.</p>
        </div>

        <div v-if="route.path === '/tr/kisiler/victor-hugo-sozleri'">
          <br /><br />
          <p> Tam adı Victor Marie Hugo olan Fransız romancı şair ve oyun yazarı eserlerini romantik akıma bağlı olarak
            ortaya koymuştur.</p>
          <p>En bilindik eserleri Sefiller ve Notre Dame'ın Kamburu'dur.</p>
        </div>

        <section v-if="relatedAuthors.length" class="related-authors" aria-labelledby="related-authors-heading">
          <h2 id="related-authors-heading">İlgili Kişiler</h2>
          <div class="related-authors-grid">
            <NuxtLink
              v-for="related in relatedAuthors"
              :key="related.id"
              :to="Array.isArray(related.tr_quotes) && related.tr_quotes.length
                ? `/tr/kisiler/${related.id}-sozleri`
                : `/authors/${related.id}-quotes`"
              class="related-author-card"
            >
              <img
                :src="useSitePath(related.img)"
                :alt="`${related.name} ${related.surname}`.trim()"
                :width="related.img_width"
                :height="related.img_height"
              />
              <span>{{ related.name }} {{ related.surname }}</span>
            </NuxtLink>
          </div>
        </section>

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
import { computed } from 'vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const route = useRoute()
const slug = route.params.slug

const { data: authorsData } = await useAsyncData(`tr-authors-related-${slug}`, () =>
  $fetch(usePublicDataPath('https://wordsfromlife.com/static/data/author-quotes.json'))
)

const { data: author } = await useAsyncData(`tr-author-${slug}`, async () => {
  const allAuthors = await $fetch(usePublicDataPath('https://wordsfromlife.com/static/data/author-quotes.json'))
  return allAuthors.find(item =>
    `${item.id}-sozleri`.toLowerCase() === slug.toLowerCase() &&
    Array.isArray(item.tr_quotes) &&
    item.tr_quotes.length > 0
  )
})

const relatedAuthors = computed(() => {
  if (!author.value) return []
  const ids = author.value['related-authors'] || author.value['related-person'] || []
  return (authorsData.value || [])
    .filter(item => ids.includes(item.id) && item.img)
})

if (author.value) {
  const authorName = `${author.value.name} ${author.value.surname}`.trim()
  const path = `/tr/kisiler/${author.value.id}-sozleri`

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
  background: none !important;
  border: none !important;
}

:global(body#tr-author-page-body nav a) {
  color: #fff !important;
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

.related-authors {
  margin: 3rem 0 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.35);
}

.related-authors h2 {
  color: #fff;
  text-align: center;
}

.related-authors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}

.related-author-card {
  display: block;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 8px;
  color: #fff;
  text-align: center;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.55);
}

.related-author-card img {
  display: block;
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.related-author-card span {
  display: block;
  padding: 0.75rem 0.5rem;
  font-size: 20px;
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
