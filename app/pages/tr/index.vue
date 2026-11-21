<template>
  <div>
    <Navbar_tr />

    <main class="turkish-home">
      <header class="hero">
        <p class="eyebrow">Words From Life</p>
        <h1>Türkçe Dil ve Kültür İçerikleri</h1>
        <p class="hero-description">
          Kelimelerin anlamlarını, kökenlerini ve kullanımlarını; ünlü kişilerin
          sözlerini ve hikâyeleri keşfedin.
        </p>
      </header>

      <section class="section-grid" aria-label="Türkçe içerikler">
        <NuxtLink to="/tr/kelimeler" class="section-card">
          <span class="card-label">Sözlük</span>
          <h2>Kelimeler</h2>
          <p>
            Türkçe kelimelerin anlamlarını, kökenlerini ve özel kelime listelerini inceleyin.
          </p>
          <span class="card-link">Kelimelere göz at <span aria-hidden="true">→</span></span>
        </NuxtLink>

        <NuxtLink to="/tr/kisiler" class="section-card">
          <span class="card-label">Sözler</span>
          <h2>Kişiler</h2>
          <p>
            Yazar, düşünür, sanatçı ve liderlere ait Türkçe alıntılar ve hayatları.
          </p>
          <span class="card-link">Kişilere göz at <span aria-hidden="true">→</span></span>
        </NuxtLink>

        <NuxtLink to="/tr/hikaye/diderot-etkisi-nedir" class="section-card">
          <span class="card-label">Hikâyeler</span>
          <h2>Diderot Etkisi</h2>
          <p>
            Yeni bir eşyanın ardından başlayan tüketim ve yaşam tarzı döngüsünü keşfedin.
          </p>
          <span class="card-link">Hikâyeyi oku <span aria-hidden="true">→</span></span>
        </NuxtLink>

        <NuxtLink to="/tr/hikaye/aylar-isimlerini-nasil-aldi" class="section-card">
          <span class="card-label">Hikâyeler</span>
          <h2>Aylar İsimlerini Nasıl Aldı?</h2>
          <p>
            On iki ayın isimlerinin Roma mitolojisi, Latin kökenleri ve tarihten gelen hikâyesi.
          </p>
          <span class="card-link">Hikâyeyi oku <span aria-hidden="true">→</span></span>
        </NuxtLink>
      </section>
    </main>
  </div>
</template>

<script setup>
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

useHead(createPageSeoHead({
  title: 'Türkçe İçerikler | Words From Life',
  description: 'Kelimeler, ünlü kişilerin sözleri ve Türkçe hikâyeler.',
  path: '/tr',
  lang: 'tr',
  breadcrumbs: [
    { name: 'Ana Sayfa', path: '/tr' }
  ]
}))
</script>

<style scoped>
.turkish-home {
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 3rem 1.25rem 5rem;
}

.hero {
  max-width: 760px;
  margin: 0 auto 3rem;
  text-align: center;
}

.eyebrow,
.card-label {
  color: #9a643e;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.eyebrow {
  margin: 0 0 0.75rem;
}

.hero h1 {
  margin: 0 0 1rem;
  color: #202a33;
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  line-height: 1.12;
}

.hero-description {
  margin: 0;
  color: #4a5661;
  font-size: 1.1rem;
  line-height: 1.7;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.section-card {
  display: flex;
  min-height: 230px;
  flex-direction: column;
  padding: 1.5rem;
  border: 1px solid #e8e3dc;
  border-radius: 0.75rem;
  background: #fff;
  color: inherit;
  text-decoration: none;
  transition: box-shadow 0.2s, transform 0.2s;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgb(32 42 51 / 10%);
}

.card-label {
  margin-bottom: 0.5rem;
}

.section-card h2 {
  margin: 0 0 0.75rem;
  color: #202a33;
  font-size: 1.5rem;
}

.section-card p {
  margin: 0 0 1.25rem;
  color: #4a5661;
  line-height: 1.7;
}

.card-link {
  margin-top: auto;
  color: #9a643e;
  font-weight: 700;
}

@media (max-width: 700px) {
  .turkish-home {
    padding: 2rem 1rem 3.5rem;
  }

  .section-grid {
    grid-template-columns: 1fr;
  }

  .section-card {
    min-height: 200px;
  }
}
</style>
