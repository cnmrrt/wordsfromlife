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

const route = useRoute()
const slug = route.params.slug

// ✅ asyncData = loads before render (SSR + SSG)
const { data: preverb } = await useAsyncData(`preverb-${slug}`, async () => {
  const res = await $fetch(usePublicDataPath('/static/data/preverbs.json'))
  return res.find(item => item.id?.toLowerCase() === slug.toLowerCase())
})

useHead(() => {
  if (!preverb.value) return {}
  const preverbUrl = `https://wordsfromlife.com/preverbs/${preverb.value.id}`
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://wordsfromlife.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Preverbs',
        item: 'https://wordsfromlife.com/preverbs'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: preverb.value.preverb,
        item: preverbUrl
      }
    ]
  }

  return {
    title: `${preverb.value.preverb}`,
    meta: [
      { name: 'description', content: preverb.value.en_meta_desc || '' },
      { property: 'og:title', content: `${preverb.value.preverb}` },
      { property: 'og:description', content: preverb.value.en_meta_desc || '' },
      { property: 'og:image', content: preverb.value.img || '' },
      { property: 'og:url', content: preverbUrl }
    ],
    link: [
        {
          rel: 'canonical',
          href: preverbUrl
        }
      ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c')
      }
    ]
  }
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
