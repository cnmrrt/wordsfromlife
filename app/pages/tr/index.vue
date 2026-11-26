<template>
  <div>
    <Navbar_tr />
    <main class="main" role="main">
      <h1>Words From Life</h1>

      <NuxtLink to="/tr/hikaye/diderot-etkisi-nedir" class="story-feature">
        <img
          src="/static/img/story/dennis-diderot-effect.webp"
          alt="Denis Diderot zengin eşyalarla döşenmiş odasında yazı yazarken"
          width="1248"
          height="832"
        >
        <span class="story-feature-copy">
          <span class="story-feature-title">Diderot Etkisi Nedir?</span>
          <span class="story-feature-description">
            Yeni bir eşya edinmenin tüketim sarmalı başlatabileceğini ve bunun
            kişinin yaşam tarzını nasıl değiştirebileceğini keşfedin.
          </span>
        </span>
      </NuxtLink>

      <NuxtLink to="/tr/hikaye/aylar-isimlerini-nasil-aldi" class="story-feature">
        <span class="story-feature-copy">
          <span class="story-feature-title">Aylar İsimlerini Nasıl Aldı?</span>
          <span class="story-feature-description">
            On iki ayın isimlerinin Roma tanrıları, Latin sayıları, festivaller
            ve tarihten gelen kökenlerini inceleyin.
          </span>
        </span>
      </NuxtLink>

      <div class="home-container">
        <section class="section">
          <h2>Kişiler</h2>
          <div id="turkish-authors-masonry">
            <div
              v-for="author in authors"
              :key="author.id"
              class="demo"
            >
              <NuxtLink :to="`/tr/kisiler/${author.id}-sozleri`">
                <img
                  v-if="author.img"
                  :src="useSitePath(author.img)"
                  :alt="`${author.name} ${author.surname}`"
                  :width="author.img_width"
                  :height="author.img_height"
                >
                <span class="author-name">
                  {{ author.name }} {{ author.surname }}
                </span>
              </NuxtLink>
            </div>
          </div>
        </section>

        <section id="word-container" class="section">
          <h2>Kelimeler</h2>
          <ul>
            <li v-for="word in words" :key="String(word.id)">
              <NuxtLink :to="`/tr/kelimeler/${word.id}`">{{ word.word }}</NuxtLink>
            </li>
          </ul>
          <hr class="section-divider">
          <p>
            <NuxtLink to="/tr/kelimeler/fransizca-kokenli-turkce-kelimeler">
              Fransızca Kökenli Türkçe Kelimeler
            </NuxtLink>
          </p>
          <p>
            <NuxtLink to="/tr/kelimeler/turkcede-en-cok-yapilan-yazim-hatalari">
              Türkçe'de En Çok Yapılan Yazım Hataları
            </NuxtLink>
          </p>
          <p>
            <NuxtLink to="/tr/kelimeler/turkcedeki-es-anlamli-kelimeler">
              Türkçedeki Eş Anlamlı Kelimeler
            </NuxtLink>
          </p>
          <p>
            <NuxtLink to="/tr/kelimeler/turkcedeki-zit-anlamli-kelimeler">
              Türkçedeki Zıt Anlamlı Kelimeler
            </NuxtLink>
          </p>
          <p>
            <NuxtLink to="/tr/kelimeler/sivas-yoresel-kelimeler">
              Sivas Yöresel Kelimeleri
            </NuxtLink>
          </p>
          <p>
            <NuxtLink to="/tr/kelimeler/osmanlica-kelimeler">
              Osmanlıca Kelimeler ve Anlamları
            </NuxtLink>
          </p>
          <p>
            <NuxtLink to="/tr/kelimeler/bilim-dallari-isimleri">
              Bilim Dalları İsimleri
            </NuxtLink>
          </p>
        </section>
      </div>

      <h2 class="stories-heading">Hikâyeler</h2>

      <NuxtLink to="/tr/hikaye/diderot-etkisi-nedir" class="story-feature">
        <img
          src="/static/img/story/dennis-diderot-effect.webp"
          alt="Denis Diderot zengin eşyalarla döşenmiş odasında yazı yazarken"
          width="1248"
          height="832"
        >
        <span class="story-feature-copy">
          <span class="story-feature-title">Diderot Etkisi Nedir?</span>
          <span class="story-feature-description">
            Yeni bir eşyanın daha fazla tüketimi tetikleyebileceği tüketim
            döngüsünü ve bunun kimliğe nasıl dokunduğunu inceleyin.
          </span>
        </span>
      </NuxtLink>

      <NuxtLink to="/tr/hikaye/aylar-isimlerini-nasil-aldi" class="story-feature">
        <span class="story-feature-copy">
          <span class="story-feature-title">Aylar İsimlerini Nasıl Aldı?</span>
          <span class="story-feature-description">
            Roma tanrıları, Latin sayıları, festivaller ve siyasi tarih;
            ayların isimlerinin ardındaki hikâyeyi açıklıyor.
          </span>
        </span>
      </NuxtLink>

      <NuxtLink to="/tr/hikaye/ilgin-markalarin-isimleri" class="story-feature">
        <span class="story-feature-copy">
          <span class="story-feature-title">İlginç Marka İsimleri ve Arkalarındaki Hikâyeler</span>
          <span class="story-feature-description">
            Nike, Google, Starbucks ve Bluetooth gibi markaların isimlerinin
            mitoloji, edebiyat, bilim ve beklenmedik rastlantılarla dolu
            hikâyelerini keşfedin.
          </span>
        </span>
      </NuxtLink>

      <NuxtLink to="/tr/hikaye/buyuk-buhran" class="story-feature">
        <img
          src="/static/img/story/great-depression-people-lined-up.webp"
          alt="Büyük Buhran sırasında ücretsiz bir aşevinin önünde sıraya giren insanlar"
          width="1408"
          height="1024"
        >
        <span class="story-feature-copy">
          <span class="story-feature-title">Büyük Buhran: Nedenleri, Etkileri ve Toparlanma Süreci</span>
          <span class="story-feature-description">
            1929'da başlayan ekonomik krizin nedenlerini, insanların yaşamı
            üzerindeki etkilerini ve dünyayı değiştiren toparlanma sürecini
            keşfedin.
          </span>
        </span>
      </NuxtLink>

      <NuxtLink to="/tr/hikaye/theseus-gemisi" class="story-feature">
        <img
          src="/static/img/story/ship-of-theseus.webp"
          alt="Antik Yunan döneminden bir gemi denizde ilerliyor"
          width="1408"
          height="1024"
        >
        <span class="story-feature-copy">
          <span class="story-feature-title">Theseus’un Gemisi: Kimlik Üzerine Bir Paradoks</span>
          <span class="story-feature-description">
            Tüm parçaları zamanla değiştirilen bir gemi aynı gemi olarak kalır
            mı? Antik Yunan’dan günümüze uzanan bu felsefi düşünce deneyini
            inceleyin.
          </span>
        </span>
      </NuxtLink>

      <NuxtLink to="/tr/hikaye/solomon-paradoksu" class="story-feature">
        <img
          src="/static/img/story/solomon-paradox.webp"
          alt="Kral Solomon zor bir hüküm üzerinde düşünürken"
          width="1408"
          height="1024"
        >
        <span class="story-feature-copy">
          <span class="story-feature-title">Solomon Paradoksu: Neden Başkalarına Daha İyi Öğüt Veririz?</span>
          <span class="story-feature-description">
            Kendi sorunlarımız yerine başkalarının sorunlarına daha sağduyulu
            yaklaşmamıza yol açabilen psikolojik mesafeyi ve bu paradoksun
            ardındaki araştırmaları keşfedin.
          </span>
        </span>
      </NuxtLink>
    </main>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const { data: authorsData } = await useAsyncData('turkish-authors-home', () =>
  $fetch(usePublicDataPath('https://wordsfromlife.com/static/data/author-quotes.json'))
)

const { data: wordsData } = await useFetch('/api/tr/words')

const authors = computed(() => (authorsData.value || [])
  .filter(author => Array.isArray(author.tr_quotes) && author.tr_quotes.length > 0 && author.img)
  .sort((a, b) => `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`, 'tr')))

const words = computed(() => (wordsData.value || [])
  .slice()
  .sort((a, b) => String(a.word || '').localeCompare(String(b.word || ''), 'tr', { sensitivity: 'base' })))

const masonryInstance = ref(null)

onMounted(async () => {
  await nextTick()
  if (masonryInstance.value) masonryInstance.value.destroy()
  const Macy = (await import('macy')).default
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
  title: 'Words From Life - Türkçe Sözler, Kelimeler ve Hikâyeler',
  description: 'İlham veren sözler, Türkçe kelimeler ve hikâyeler.',
  path: '/tr',
  lang: 'tr',
  alternateLanguages: [
    { lang: 'en', path: '/' },
    { lang: 'tr', path: '/tr' },
    { lang: 'x-default', path: '/' }
  ],
  breadcrumbs: [
    { name: 'Ana Sayfa', path: '/tr' }
  ]
}))
</script>

<style scoped src="~/assets/css/home.css"></style>

<style scoped>
.main h1 {
  text-align: center;
  font-size: 40px;
  margin: 2rem 0;
}

.section h2,
.stories-heading {
  margin: 3rem 0 2rem;
  text-align: center;
  font-size: 40px;
}

#turkish-authors-masonry {
  padding: 1rem 0;
}

#turkish-authors-masonry .demo {
  width: 100%;
  border: 2px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

#turkish-authors-masonry .demo a {
  display: block;
  color: #222;
  text-decoration: none;
}

#turkish-authors-masonry .demo img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.author-name {
  display: block;
  padding: 0.5rem 0.25rem;
  text-align: center;
  font-weight: 600;
}

.section-divider {
  margin: 2rem 0;
  border-width: 1px 0 0;
  border-style: solid;
  color: #d3d3d3;
}

@media (max-width: 767px) {
  .main h1,
  .section h2,
  .stories-heading {
    font-size: 32px;
  }
}
</style>
