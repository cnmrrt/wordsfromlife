<template>
  <Navbar />

  <div v-if="error" class="error">
    <p>{{ error.message }}</p>
  </div>

  <div v-else-if="authorData" class="backgroundImage" :style="{ '--bg-image': `url(${useSitePath(authorData.img)})` }">
    <main id="main-content" class="container position-relative mt-5">
      <h1>{{ authorData.name }} {{ authorData.surname }} Quotes</h1>

      <!-- <div id="main-image">
        <img :src="authorData.img" :alt="`${authorData.name} ${authorData.surname}`" :width="authorData.img_width"
          :height="authorData.img_height" />
      </div> -->
      <ins class="adsbygoogle" style="display: inline-block; height: 90px" data-ad-client="ca-pub-5581015881313741"
        data-ad-slot="1945579971"></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>

      <q v-for="(quote, index) in authorData.en_quotes" :key="index" v-html="useSiteHtml(quote)"></q>
      <span class="size text-right">{{ authorData.name }} {{ authorData.surname }}</span>
      <span class="size text-right">{{ authorData.born }} - {{ authorData.dead }}</span>

      <div v-if="route.path === '/authors/alexander-the-greate-quotes'" id="alexander-the-great-statue">
        <p>
          <a href="https://musttoseeplaces.substack.com/p/alexander-the-great-statue" target="_blank">Alexander the
            Great Statue at North Macedonia / Skopje</a>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { useRoute, useHead } from "#imports";

import Navbar from "~/components/Navbar.vue";
import { createPageSeoHead } from '~/utils/pageSeo'

const route = useRoute();
const slug = route.params.slug;

// Masonry instance ref
const macyRef = ref(null);

// Fetch author data server-side
const { data: authorData, error } = await useAsyncData(`author-${slug}`, async () => {
  const allAuthors = await $fetch(usePublicDataPath('/static/data/author-quotes.json'));
  const author = allAuthors.find(
    (a) => `${a.id}-quotes`.toLowerCase() === slug.toLowerCase()
  );
  if (!author) throw new Error("Author not found");
  return author;
});

// Set SEO meta tags server-side
if (authorData.value) {
  const authorName = `${authorData.value.name} ${authorData.value.surname} Quotes`;
  useHead(createPageSeoHead({
    title: authorName,
    description: authorData.value.en_meta_desc || `Inspirational quotes by ${authorName}.`,
    path: `/authors/${authorData.value.id}-quotes`,
    image: authorData.value.img,
    type: 'article',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Authors', path: '/authors' },
      { name: authorName, path: `/authors/${authorData.value.id}-quotes` }
    ],
    bodyAttrs: {
      id: 'author-page-body',
    }
  }));
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap');
:global(body#author-page-body) {
    background-color: black;
    font-family: "Gochi Hand", cursive;
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

:global(body#author-page-body nav) { background: none !important; border: none !important; }
:global(body#author-page-body nav ul li a ) { color: #fff !important; }



.backgroundImage:after {
  content: "";
  background: var(--bg-image);
  background-image: var(--bg-image);
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

.mt-5,
.my-5 {
  margin-top: 3rem !important;
}

.position-relative {
  position: relative !important;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
@media (max-width: 576px) {
  :global(body#author-page-body q) { 
    font-size: 20px;
  }
}

.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

p,
h1,
nav ul li a {
  color: white !important;
  display: block !important;
}

:global(body#author-page-body q) { 
  color: #fff;
  display: block;
  font-size: 40px;
  margin: 30px 0;
  text-align: center;
}

:global(body#author-page-body q a), :global(body#author-page-body p a) {
  color: blue !important;
  text-decoration: underline !important;
}

.size {font-size: 30px;}
.text-right {text-align: right; display: block; color:#fff !important;}

.error {
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
}
</style>
