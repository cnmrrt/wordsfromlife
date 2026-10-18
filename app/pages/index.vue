<template>
  <Navbar />
  <main class="main" role="main">
    <h1>Words From Life</h1>
    <div class="home-container">
      <!-- Authors Section -->
      <section class="section">
        <div id="macy-container">
          <div
            v-for="item in authorsData"
            :key="item.id"
            v-show="item.en_quotes !== '' && item.img != null"
            class="demo"
          >
            <NuxtLink :to="`/authors/${item.id}-quotes`">
              <!--<img
                :src="item.img"
                :alt="`${item.name} ${item.surname}`"
                :width="item.img_width"
                :height="item.img_height"
              />-->
              <img
                :src="item.img"
                :alt="`${item.name} ${item.surname}`"
              />
              <span style="display: block; text-align: center; padding: .2rem 0">
                {{ item.name }} {{ item.surname }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Words Section -->
      <section class="section">
        <h2 style="font-size: 40px; text-align: center; margin: 3rem 0 2rem 0">Words</h2>
        <div id="word-container">
          <div v-for="item in wordsData" :key="item.id" class="demo">
            <NuxtLink :to="`/words/${item.id}`">
              <span>{{ item.word }}</span>
              <p>{{ item.en_meta_desc }}</p>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Proverbs Section -->
      <section class="section">
        <h2 style="font-size: 40px; text-align: center; margin: 3rem 0 2rem 0">Proverbs</h2>
        <div id="preverbs-container">
          <div v-for="item in preverbsData" :key="item.id" class="demo">
            <NuxtLink :to="`/preverbs/${item.id}`">
              <span>{{ item.preverb }}</span>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'

import { ref, onMounted, nextTick } from 'vue'


useHead(() => {
  return {
    title: 'Words From Life - Quotes, Words, Idioms and Proverbs',
    meta: [
      { name: 'description', content: 'All inspirational and motivational quotes.' },
      { property: 'og:title', content: 'Words From Life - Quotes, Words, Idioms and Proverbs' },
      { property: 'og:description', content: 'All inspirational and motivational quotes.'},
      // { property: 'og:image', content: preverb.value.img || '' },
      { property: 'og:url', content: `https://wordsfromlife.com/` }
    ],
    link: [
        {
          rel: 'canonical',
          href: `https://wordsfromlife.com/`
        }
      ]
  }
})


// -------------------
// Fetch data on SSR
// -------------------
const { data: authorsData } = await useAsyncData('authors', () =>
  $fetch('https://wordsfromlife.com/static/data/author-quotes.json')
)

const { data: wordsData } = await useAsyncData('words', () =>
  $fetch('https://wordsfromlife.com/static/data/words.json')
)

const { data: preverbsData } = await useAsyncData('preverbs', () =>
  $fetch('https://wordsfromlife.com/static/data/preverbs.json')
)

let macyRef = ref(null)
let wordsMacyRef = ref(null)
let preverbsMacyRef = ref(null)

const initMasonry = async (containerId, columns, breakAt, instanceRef) => {
  await nextTick()
  if (instanceRef.value) instanceRef.value.destroy()
  const Macy = (await import('macy')).default
  instanceRef.value = Macy({
    container: containerId,
    trueOrder: false,
    waitForImages: false,
    margin: 15,
    columns,
    breakAt
  })
}

// Initialize Masonry after mounting
onMounted(async () => {
  await initMasonry('#macy-container', 6, { 1200: 4, 940: 3, 520: 2 }, macyRef)
  await initMasonry('#word-container', 4, { 1200: 3, 940: 2, 520: 1 }, wordsMacyRef)
  await initMasonry('#preverbs-container', 5, { 1200: 4, 940: 3, 520: 2 }, preverbsMacyRef)
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

.section:not(:last-child) {
  border-bottom: 1px solid #e5e5e5;
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

#macy-container,
#word-container,
#preverbs-container {
  padding: 1rem 0;
}

#macy-container .demo,
#word-container .demo,
#preverbs-container .demo {
  width: 100%;
  margin-bottom: 20px;
}

#word-container span {
  display: block;
  width: 100%;
  text-align: center;
  margin: 0.5rem 0;
  font-weight: bold;
  font-size: 20px;
}

#word-container p {
  padding: 0.5rem;
  margin: 0;
  text-align: center;
  color: #666;
}

#preverbs-container span {
  display: block;
  padding: 0.5rem;
  margin: 0;
  font-weight: 600;
  text-align: center;
}

@media (max-width: 767px) {
  .home-container {
    max-width: 100%;
    padding: 0 1rem;
  }
}
</style>
