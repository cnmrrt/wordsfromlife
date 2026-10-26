<template>
  <div>
    <Navbar_tr />
    <main class="main" role="main">
      <h1>Kişiler</h1>
      <div class="authors-container">
        <div id="turkish-authors-masonry">
          <div
            v-for="author in authors"
            :key="author.id"
            class="author-card"
          >
            <NuxtLink :to="`/tr/kisiler/${author.id}-sozleri`">
              <img
                v-if="author.img"
                :src="useSitePath(author.img)"
                :alt="`${author.name} ${author.surname}`.trim()"
                :width="author.img_width"
                :height="author.img_height"
              >
              <span>{{ author.name }} {{ author.surname }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const { data: authorsData } = await useFetch(
  usePublicDataPath('https://wordsfromlife.com/static/data/author-quotes.json')
)

const authors = computed(() => (authorsData.value || [])
  .filter(author => Array.isArray(author.tr_quotes) && author.tr_quotes.length > 0)
  .sort((a, b) => `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`, 'tr')))

const masonryInstance = ref(null)

onMounted(async () => {
  const Macy = (await import('macy')).default
  await nextTick()
  masonryInstance.value = Macy({
    container: '#turkish-authors-masonry',
    trueOrder: false,
    waitForImages: false,
    margin: 15,
    columns: 6,
    breakAt: { 1200: 4, 940: 3, 520: 2 }
  })
})

onBeforeUnmount(() => {
  masonryInstance.value?.destroy()
})

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

#turkish-authors-masonry {
  padding: 1rem 0 3rem;
}

.author-card {
  border: 2px solid #eee;
  margin: 10px;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.author-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.author-card a {
  display: block;
  color: #222;
  text-align: center;
  text-decoration: none;
}

.author-card img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 4px;
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
