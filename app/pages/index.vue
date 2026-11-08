<template>
  <Navbar />
  <main class="main" role="main">
    <h1>Words From Life</h1>
    <a href="/story/what-is-the-diderot-effect" class="story-feature"> 
      <img src="https://wordsfromlife.com/static/img/story/dennis-diderot-effect.webp"
        alt="Denis Diderot writing at his desk" width="1248" height="832" />
      <span class="story-feature-copy">
        <span class="story-feature-title">What Is the Diderot Effect?</span>
        <span class="story-feature-description">
          The Diderot Effect is a psychological and socio-cultural phenomenon where acquiring a new possession sets off
          a spiral of consumption, leading you to purchase more and more items that match the upgraded status or
          aesthetic of the initial acquisition.
        </span>
      </span>
    </a>
    <div class="home-container">
      <!-- Authors Section -->
      <section class="section">
        <div id="macy-container">
          <div v-for="item in authorsData" :key="item.id" v-show="item.en_quotes !== '' && item.img != null"
            class="demo">
            <NuxtLink :to="`/authors/${item.id}-quotes`">
              <!--<img
                :src="useSitePath(item.img)"
                :alt="`${item.name} ${item.surname}`"
                :width="item.img_width"
                :height="item.img_height"
              />-->
              <img :src="useSitePath(item.img)" :alt="`${item.name} ${item.surname}`" />
              <span style="display: block; text-align: center; padding: .2rem 0">
                {{ item.name }} {{ item.surname }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Words Section -->
      <section class="section" id="word-container"><!---->
        <ul><!--[-->
          <li><a href="/words/adversity" class="">Adversity</a></li>
          <li><a href="/words/allegory" class="">Allegory</a></li>
          <li><a href="/words/anemoia" class="">Anemoia</a></li>
          <li><a href="/words/anthology" class="">Anthology</a></li>
          <li><a href="/words/arena" class="">Arena</a></li>
          <li><a href="/words/balkan" class="">Balkan</a></li>
          <li><a href="/words/barbecue" class="">Barbecue</a></li>
          <li><a href="/words/bibliophilia" class="">Bibliophilia</a></li>
          <li><a href="/words/boycott" class="">Boycott</a></li>
          <li><a href="/words/bucolic" class="">Bucolic</a></li>
          <li><a href="/words/camouflage" class="">Camouflage</a></li>
          <li><a href="/words/cappuccino" class="">Cappuccino</a></li>
          <li><a href="/words/checkmate" class="">Checkmate</a></li>
          <li><a href="/words/cinephile" class="">Cinephile</a></li>
          <li><a href="/words/cittaslow" class="">Cittaslow</a></li>
          <li><a href="/words/colorism" class="">Colorism</a></li>
          <li><a href="/words/computer" class="">Computer</a></li>
          <li><a href="/words/daisy" class="">Daisy</a></li>
          <li><a href="/words/deja-vu" class="">Deja vu</a></li>
          <li><a href="/words/disaster" class="">Disaster</a></li>
          <li><a href="/words/ephemeral" class="">Ephemeral</a></li>
          <li><a href="/words/epiphany" class="">Epiphany</a></li>
          <li><a href="/words/epistemology" class="">Epistemology</a></li>
          <li><a href="/words/essential" class="">Essential</a></li>
          <li><a href="/words/eternal" class="">Eternal</a></li>
          <li><a href="/words/ethereal" class="">Ethereal</a></li>
          <li><a href="/words/fiasco" class="">Fiasco</a></li>
          <li><a href="/words/fortuity" class="">Fortuity</a></li>
          <li><a href="/words/governance" class="">Governance</a></li>
          <li><a href="/words/honor" class="">Honor</a></li>
          <li><a href="/words/hooligan" class="">Hooligan</a></li>
          <li><a href="/words/judge" class="">Judge</a></li>
          <li><a href="/words/jumbo" class="">Jumbo</a></li>
          <li><a href="/words/luminous" class="">Luminous</a></li>
          <li><a href="/words/magazine" class="">Magazine</a></li>
          <li><a href="/words/malaria" class="">Malaria</a></li>
          <li><a href="/words/marathon" class="">Marathon</a></li>
          <li><a href="/words/marmalade" class="">Marmalade</a></li>
          <li><a href="/words/mediocrity" class="">Mediocrity</a></li>
          <li><a href="/words/mellifluous" class="">Mellifluous</a></li>
          <li><a href="/words/memento" class="">Memento</a></li>
          <li><a href="/words/monarchy" class="">Monarchy</a></li>
          <li><a href="/words/mortgage" class="">Mortgage</a></li>
          <li><a href="/words/muscle" class="">Muscle</a></li>
          <li><a href="/words/nostalgia" class="">Nostalgia</a></li>
          <li><a href="/words/overmorrow" class="">Overmorrow</a></li>
          <li><a href="/words/paternal" class="">Paternal</a></li>
          <li><a href="/words/peripheral" class="">Peripheral</a></li>
          <li><a href="/words/petrichor" class="">Petrichor</a></li>
          <li><a href="/words/quarantine" class="">Quarantine</a></li>
          <li><a href="/words/robot" class="">Robot</a></li>
          <li><a href="/words/sabotage" class="">Sabotage</a></li>
          <li><a href="/words/salary" class="">Salary</a></li>
          <li><a href="/words/serendipity" class="">Serendipity</a></li>
          <li><a href="/words/shrinkflation" class="">Shrinkflation</a></li>
          <li><a href="/words/sideburns" class="">Sideburns</a></li>
          <li><a href="/words/silhouette" class="">Silhouette</a></li>
          <li><a href="/words/soccer" class="">Soccer</a></li>
          <li><a href="/words/sonder" class="">Sonder</a></li>
          <li><a href="/words/spam" class="">Spam</a></li>
          <li><a href="/words/state" class="">State</a></li>
          <li><a href="/words/sumud" class="">Sumud</a></li>
          <li><a href="/words/surprize" class="">Surprize</a></li>
          <li><a href="/words/trivia" class="">Trivia</a></li>
          <li><a href="/words/vellichor" class="">Vellichor</a></li>
          <li><a href="/words/zenith" class="">Zenith</a></li><!--]-->
        </ul>
        <hr
          style="border-left:0;border-right:0;color:#d3d3d3 !important;border-bottom:0;border-style:solid;border-top-width:1px;margin:2rem 0;">
        <p><a href="/words/english-words-origin-french" class="">English Words of French Origin</a></p>
        <hr
          style="border-left:0;border-right:0;color:#d3d3d3 !important;border-bottom:0;border-style:solid;border-top-width:1px;margin:2rem 0;">
        <p><a href="/words/english-synonym-words" class="">English Synonym Words</a></p>
      </section>
      <!-- <section class="section">
        <h2 style="font-size: 40px; text-align: center; margin: 3rem 0 2rem 0">Words</h2>
        <div id="word-container">
          <div v-for="item in wordsData" :key="item.id" class="demo">
            <NuxtLink :to="`/words/${item.id}`">
              <span>{{ item.word }}</span>
              <p>{{ item.en_meta_desc }}</p>
            </NuxtLink>
          </div>
        </div>
      </section> -->

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
import { createPageSeoHead } from '~/utils/pageSeo'

import { ref, onMounted, nextTick } from 'vue'

useHead(createPageSeoHead({
  title: 'Words From Life - Quotes, Words, Idioms and Proverbs',
  description: 'All inspirational and motivational quotes.',
  path: '/',
  breadcrumbs: [{ name: 'Home', path: '/' }]
}))


// -------------------
// Fetch data on SSR
// -------------------
const { data: authorsData } = await useAsyncData('authors', () =>
  $fetch(usePublicDataPath('https://wordsfromlife.com/static/data/author-quotes.json'))
)

const { data: wordsData } = await useAsyncData('words', () =>
  $fetch(usePublicDataPath('https://wordsfromlife.com/static/data/words.json'))
)

const { data: preverbsData } = await useAsyncData('preverbs', () =>
  $fetch(usePublicDataPath('https://wordsfromlife.com/static/data/preverbs.json'))
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
  // await initMasonry('#word-container', 4, { 1200: 3, 940: 2, 520: 1 }, wordsMacyRef)
  await initMasonry('#preverbs-container', 5, { 1200: 4, 940: 3, 520: 2 }, preverbsMacyRef)
})
</script>

<style scoped>
.main {
  padding: 2rem 0;
}

.story-feature {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 1080px;
  margin: 0 auto 2rem;
  padding: 1rem;
  color: #202a33;
  border: 1px solid #e8e3dc;
  border-radius: 4px;
  transition: box-shadow 0.2s, transform 0.2s;
}

.story-feature:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.story-feature img {
  width: 220px;
  flex: 0 0 220px;
  border-radius: 8px;
}

.story-feature-copy {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.story-feature-label {
  color: #9a643e;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.story-feature-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.story-feature-description {
  color: #4a5661;
  line-height: 1.6;
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
/*#word-container .demo, */
#preverbs-container .demo {
  width: 100%;
  margin-bottom: 20px;
}

.words-container ul {
  text-align: center;
  padding: 0 !important;
}

/* #word-container span {
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
} */

#preverbs-container span {
  display: block;
  padding: 0.5rem;
  margin: 0;
  font-weight: 600;
  text-align: center;
}

@media (max-width: 767px) {
  .story-feature {
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
    margin: 0 1rem 2rem;
  }

  .story-feature img {
    width: 100%;
    flex-basis: auto;
  }

  .home-container {
    max-width: 100%;
    padding: 0 1rem;
  }
}
</style>
