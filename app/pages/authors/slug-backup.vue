<template>
  <Navbar />



  <div v-if="error" class="error">
    <p>{{ error.message }}</p>
  </div>

  <div v-else-if="authorData" class="author-detail-container">
    <style>
      .backgroundImage:after {
        content: "";
        background: url(authorData.img);
        background-image: url(authorData.img);
        background-position-x: initial;
        background-position-y: initial;
        background-size: initial;
        background-repeat: initial;
        background-attachment: initial;
        background-origin: initial;
        background-clip: initial;
        background-color: initial;
        background-repeat: no-repeat;
        background-size: cover;
        opacity: 0.4;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: fixed;
        z-index: -1;
      }
    </style>
    <main class="backgroundImage">
      <div id="maincontent" class="container position-relative mt-5 ">
        <div id="maincontent-2">
          <ins class="adsbygoogle" style="display:inline-block; height:90px;" data-ad-client="ca-pub-5581015881313741"
            data-ad-slot="1945579971"></ins>
          <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>
          <div class="row">
            <div class="col-md-9 mt-1 mx-auto text-center">
              <h1>{{ authorData.name }} {{ authorData.surname }} Quotes</h1>
              <q v-for="(quote, index) in authorData.en_quotes" :key="index" v-html="useSiteHtml(quote)"></q>

              <p class="size text-right">{{ authorData.name }} {{ authorData.surname }}</p>
              <p class="size text-right">{{ authorData.born }} - {{ authorData.dead }}</p>
            </div>
          </div>
          <div v-if="route.path === '/authors/alexander-the-greate-quotes'" id="alexander-the-great-statue">
            <p><a href="https://musttoseeplaces.substack.com/p/alexander-the-great-statue" target="_blank">Alexander the
                Great Statue at North Macedonia / Skopje</a></p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRoute, useHead } from '#imports'

import Navbar from '~/components/Navbar.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const route = useRoute()
const slug = route.params.slug

useHead(createPageSeoHead({
  title: 'Author Quotes - Words From Life',
  description: 'Explore inspirational quotes from renowned authors and thinkers.',
  path: '/authors/slug-backup',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Authors', path: '/authors' },
    { name: 'Author Quotes', path: '/authors/slug-backup' }
  ]
}))

// Masonry instance ref
const macyRef = ref(null)

// Fetch author data server-side
const { data: authorData, error } = await useAsyncData(`author-${slug}`, async () => {
  const allAuthors = await $fetch(usePublicDataPath('/static/data/author-quotes.json'))
  const author = allAuthors.find(a => `${a.id}-quotes`.toLowerCase() === slug.toLowerCase())
  if (!author) throw new Error('Author not found')
  return author
})

</script>
