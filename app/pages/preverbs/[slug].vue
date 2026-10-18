<template>
  <Navbar />

  <div v-if="preverb" class="preverb-detail-container">
    <main class="preverb-detail-main">
      <h1>{{ preverb.preverb }}</h1>

      <div id="main-image" v-if="preverb.img">
        <img
          :src="useSitePath(preverb.img)"
          :alt="preverb.preverb"
          :width="preverb.img_width"
          :height="preverb.img_height"
        />
      </div>

      <div v-html="useSiteHtml(preverb.content)"></div>
      
    </main>
  </div>

  <div v-else class="error">
    Proverb not found.
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import { useRoute, useHead } from '#imports'
import { createPageSeoHead } from '~/utils/pageSeo'

const route = useRoute()
const slug = route.params.slug

// ✅ asyncData = loads before render (SSR + SSG)
const { data: preverb } = await useAsyncData(`preverb-${slug}`, async () => {
  const res = await $fetch(usePublicDataPath('https://wordsfromlife.com/static/data/preverbs.json'))
  return res.find(item => item.id?.toLowerCase() === slug.toLowerCase())
})

useHead(() => {
  if (!preverb.value) return {}
  const path = `/preverbs/${preverb.value.id}`
  return createPageSeoHead({
    title: preverb.value.preverb,
    description: preverb.value.en_meta_desc || `Learn the meaning of the proverb ${preverb.value.preverb}.`,
    path,
    image: preverb.value.img,
    type: 'article',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Proverbs', path: '/preverbs' },
      { name: preverb.value.preverb, path }
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
.preverb-detail-container {
  max-width: 80%;
  margin: 0 auto;
  padding: 0;
}
.preverb-detail-main {
  max-width: 600px;
  margin: 0 auto;
}
.preverb-detail-main h1 {
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
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.preverb-detail-main p {
  line-height: 1.6;
  margin: 1rem 0;
}
</style>
