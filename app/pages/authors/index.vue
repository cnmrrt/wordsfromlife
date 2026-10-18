<template>
    <Navbar />
  <main class="main" role="main">
    <h1>Authors</h1>
    <div class="home-container">
      <section class="section">
        <div id="macy-container">
          <div
            v-for="item in authorsData"
            :key="item.id"
            v-show="item.en_quotes !== '' && item.img != null"
            class="demo"
          >
            <NuxtLink :to="`/authors/${item.id}-quotes`">
              <img
                :src="item.img"
                :alt="`${item.name} ${item.surname}`"
                :width="item.img_width"
                :height="item.img_height"
              />
              <span style="display: block; text-align: center; padding: .2rem 0">
                {{ item.name }} {{ item.surname }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import { ref, nextTick, onMounted } from 'vue'

useHead({
    title: `Authors`,
    meta: [
      // { name: 'description', content: authorData.value.en_meta_desc || '' },
      // { property: 'og:title', content: `${authorData.value.name} ${authorData.value.surname} Quotes` },
      // { property: 'og:description', content: authorData.value.en_meta_desc || '' },
      // { property: 'og:url', content: `https://wordsfromlife.com/authors/${authorData.value.id}-quotes` },
      // { property: 'og:image', content: authorData.value.img }
    ]
  })

const authorsData = ref([])

// Fetch authors with SSR-friendly useFetch
const { data: authors } = await useFetch('https://wordsfromlife.com/static/data/author-quotes.json')
authorsData.value = authors.value || []

// Initialize Masonry only on client
let macyInstance = null
const initMasonry = async () => {
  if (process.client) {
    const Macy = (await import('macy')).default
    await nextTick()
    if (macyInstance) macyInstance.destroy()
    macyInstance = Macy({
      container: '#macy-container',
      trueOrder: false,
      waitForImages: false,
      margin: 15,
      columns: 6,
      breakAt: { 1200: 4, 940: 3, 520: 2 }
    })
  }
}

onMounted(() => {
  initMasonry()
})
</script>

<style scoped>
.main {
  padding: 2rem 0;
}

.home-container {
  max-width: 100%;
  width: 1128px;
  padding: 0 24px;
  margin: 0 auto;
}

.section {
  padding: 0 0 50px 0;
}

.demo {
  border: 2px solid #eee;
  margin: 10px;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.demo:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.demo a {
  color: black;
  text-decoration: none;
  display: block;
}

.demo img {
  display: block;
  height: auto;
  max-width: 100%;
  border-radius: 4px;
}

#macy-container {
  padding: 1rem 0;
}

#macy-container .demo {
  width: 100%;
  margin-bottom: 20px;
}

@media (max-width: 767px) {
  .home-container {
    max-width: 100%;
    padding: 0;
  }
}
</style>
