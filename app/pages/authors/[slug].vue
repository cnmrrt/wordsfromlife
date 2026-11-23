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

      <q v-for="(quote, index) in authorData.en_quotes" :key="index" v-html="useSiteHtml(quote)"></q>
      <span class="size text-right">{{ authorData.name }} {{ authorData.surname }}</span>
      <span class="size text-right">{{ authorData.born }} - {{ authorData.dead }}</span>

      <section v-if="authorData.en_quotes_pics?.length" class="quote-images" aria-labelledby="quote-images-heading">
        <h2 id="quote-images-heading">Quote Images</h2>
        <ul class="quote-images-grid">
          <li v-for="(image, index) in authorData.en_quotes_pics" :key="image">
            <img :src="useSitePath(image)" :alt="`${authorData.name} ${authorData.surname} quote ${index + 1}`"
              loading="lazy" />
          </li>
        </ul>
      </section>

      <div v-if="route.path === '/authors/alexander-the-greate-quotes'" id="alexander-the-great-statue">
        <p>
          <a href="https://musttoseeplaces.substack.com/p/alexander-the-great-statue" target="_blank">Alexander the
            Great Statue at North Macedonia / Skopje</a>
        </p>
      </div>

      <div v-if="route.path === '/authors/salvador-dali-quotes'">
        <p>Born in Catalonia, the Spanish painter whose full name was Salvador Domingo Felipe Jacinto Dalí i
          Domènech known simply as Salvador Dali is renowned for his surrealist works.</p>
        <p>In addition to painting, Dalí also engaged in photography, sculpture, and filmmaking, gaining fame for the
          bizarre and striking imagery found in his work.</p>
        <p>Beyond his art, Salvador Dalí also drew attention through his attire, behavior, and statements; he even
          acknowledged his own eccentricity in his own words.</p>
      </div>


      <div v-if="route.path === '/authors/victor-hugo-quotes'">
        <p>The French novelist, poet, and playwright, whose full name was Victor Marie Hugo, created his works within
          the Romantic movement.</p>
        <p>His most well-known works are Les Misérables and The Hunchback of Notre-Dame.</p>
      </div>

      <section v-if="relatedAuthors.length" class="related-authors" aria-labelledby="related-authors-heading">
        <h2 id="related-authors-heading">Related Authors</h2>
        <div class="related-authors-grid">
          <NuxtLink v-for="related in relatedAuthors" :key="related.id" :to="`/authors/${related.id}-quotes`"
            class="related-author-card">
            <img :src="useSitePath(related.img)" :alt="`${related.name} ${related.surname}`.trim()"
              :width="related.img_width" :height="related.img_height" />
            <span>{{ related.name }} {{ related.surname }}</span>
          </NuxtLink>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useHead } from "#imports";

import Navbar from "~/components/Navbar.vue";
import { createPageSeoHead } from '~/utils/pageSeo'

const route = useRoute();
const slug = route.params.slug;

// Masonry instance ref
const macyRef = ref(null);

// Fetch author data server-side
const { data: authorsData } = await useAsyncData(`authors-related-${slug}`, () =>
  $fetch(usePublicDataPath('https://wordsfromlife.com/static/data/author-quotes.json'))
);

const { data: authorData, error } = await useAsyncData(`author-${slug}`, async () => {
  const allAuthors = await $fetch(usePublicDataPath('https://wordsfromlife.com/static/data/author-quotes.json'));
  const author = allAuthors.find(
    (a) => `${a.id}-quotes`.toLowerCase() === slug.toLowerCase()
  );
  if (!author) throw new Error("Author not found");
  return author;
});

const relatedAuthors = computed(() => {
  if (!authorData.value) return []
  const ids = authorData.value['related-authors'] || authorData.value['related-person'] || []
  return (authorsData.value || [])
    .filter(author => ids.includes(author.id) && author.img)
});

// Set SEO meta tags server-side
if (authorData.value) {
  const authorName = `${authorData.value.name} ${authorData.value.surname} Quotes`;
  const pageTitle = slug.toLowerCase() === 'george-orwell-quotes'
    ? 'George Orwell Quotes (Author of 1984)'
    : slug.toLowerCase() === 'henry-ford-quotes'
      ? 'Henry Ford Quotes (Founder of Ford Motor Company)'
      : authorName;
  useHead(createPageSeoHead({
    title: pageTitle,
    description: authorData.value.en_meta_desc || `Inspirational and motivational quotes by ${authorName}. Visit Words From Life for more quotes and insights from famous authors.`,
    path: `/authors/${authorData.value.id}-quotes`,
    lang: 'en',
    ...(Array.isArray(authorData.value.tr_quotes) && authorData.value.tr_quotes.length > 0
      ? {
        alternateLanguages: [
          { lang: 'en', path: `/authors/${authorData.value.id}-quotes` },
          { lang: 'tr', path: `/tr/kisiler/${authorData.value.id}-sozleri` },
          { lang: 'x-default', path: `/authors/${authorData.value.id}-quotes` }
        ]
      }
      : {}),
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

:global(body#author-page-body nav) {
  background: none !important;
  border: none !important;
}

:global(body#author-page-body nav ul li a) {
  color: #fff !important;
}



.backgroundImage:after {
  content: "";
  background: var(--bg-image);
  background-image: var(--bg-image);
  background-position: center;
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
    font-size: 20px !important;
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

:global(body#author-page-body q a),
:global(body#author-page-body p a) {
  color: #6495ed !important;
  text-decoration: underline !important;
}

.size {
  font-size: 30px;
}

.text-right {
  text-align: right;
  display: block;
  color: #fff !important;
}

.quote-images {
  margin: 3rem 0 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.35);
}

.quote-images h2 {
  color: #fff;
  text-align: center;
}

.quote-images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1rem;
  margin: 1.25rem 0 0;
  padding: 0;
  list-style: none;
}

.quote-images-grid img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
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
  color: #fff !important;
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

.error {
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
}
</style>
