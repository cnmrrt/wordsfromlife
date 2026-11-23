<template>
  <div>
    <Navbar_tr />

    <main class="words-container">
      <header class="page-header">
      <h1>Osmanlıca Kelimeler ve Anlamları</h1>
      <p class="intro">
        Osmanlı Türkçesinde kullanılan Arapça ve Farsça kökenli kelimeleri,
        kökenleri ve günümüz Türkçesindeki anlamlarıyla keşfedin.
      </p>
      <label class="search-label" for="word-search">Kelime ara</label>
      <input
        id="word-search"
        v-model="searchQuery"
        class="search-input"
        type="search"
        placeholder="Kelime, köken veya anlam yazın"
      >
      </header>

      <section class="table-wrapper" aria-label="Osmanlıca kelimeler ve anlamları">
        <table class="words-table">
          <thead>
            <tr>
              <th scope="col">Kelime</th>
              <th scope="col">Köken</th>
              <th scope="col">Anlamı</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredWords.length === 0">
              <td colspan="3" class="no-results">Aramanızla eşleşen kelime bulunamadı.</td>
            </tr>
            <tr v-for="item in filteredWords" :key="item.word">
              <th scope="row" class="word-cell" v-html="item.word"></th>
              <td>{{ item.origin }}</td>
              <td>{{ item.meaning }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const searchQuery = ref('')

const words = [
  { word: 'Ahenk', origin: 'Farsça', meaning: 'Uyum, düzen, kulağa hoş gelen ses dizisi.' },
  { word: 'Bîtap', origin: 'Farsça', meaning: 'Halsiz, yorgun, bitkin, takatsiz.' },
  { word: 'Cefa', origin: 'Arapça', meaning: 'Eziyet, sıkıntı, haksızlık; vefanın zıddı.' },
  { word: 'Dilgir', origin: 'Farsça', meaning: 'Gönlü kırık, incinmiş, hüzünlü.' },
  { word: 'Efkar', origin: 'Arapça', meaning: 'Düşünceler, tasalar, gam; kederlenmek.' },
  { word: 'Füsunkâr', origin: 'Farsça', meaning: 'Büyüleyici, etkileyici, insanı kendine çeken.' },
  { word: 'Gaflet', origin: 'Arapça', meaning: 'Aymazlık, dalgınlık, gerçeği görememe hâli.' },
  { word: 'Hamiyet', origin: 'Arapça', meaning: 'Koruyuculuk, vatan, millet veya değerler uğruna özveride bulunma duygusu.' },
  { word: 'Hazer', origin: 'Arapça', meaning: 'Sakınma, çekinme, ihtiyatlı davranma.' },
  { word: 'İhtişam', origin: 'Arapça', meaning: 'Görkem, büyüklük, göz dolduran parlaklık.' },
  { word: '<a href="/tr/kelimeler/inziva">İnziva</a>', origin: 'Arapça', meaning: 'Bir köşeye çekilip kendi iç dünyasına yönelme, yalnız kalma.' },
  { word: 'Kemal', origin: 'Arapça', meaning: 'Olgunluk, yetkinlik, eksiksizlik.' },
  { word: 'Mahcubiyet', origin: 'Arapça', meaning: 'Utangaçlık, sıkılganlık, mahcup olma durumu.' },
  { word: 'Münzevi', origin: 'Arapça', meaning: 'Köşesine çekilmiş, insanlardan uzak, yalnız yaşamayı seçen kimse.' },
  { word: 'Müselles', origin: 'Arapça', meaning: 'Üçgen; ayrıca kaynatılarak koyulaştırılmış şarap veya şerbet.' },
  { word: 'Nazar', origin: 'Arapça', meaning: 'Bakış, görüş; bazı inançlarda değen kötü göz.' },
  { word: 'Rıza', origin: 'Arapça', meaning: 'İstekle kabullenme, gönül hoşluğu, onay.' },
  { word: 'Sükûnet', origin: 'Arapça', meaning: 'Sessizlik, durgunluk, dinginlik, huzur.' },
  { word: 'Sermest', origin: 'Farsça', meaning: 'Sarhoş, kendinden geçmiş, coşkulu.' },
  { word: 'Teveccüh', origin: 'Arapça', meaning: 'Yönelme, ilgi gösterme, güler yüz ve yakınlık.' },
  { word: 'Zevâl', origin: 'Arapça', meaning: 'Yok olma, sona erme; güneşin tepe noktasını geçmesi.' },
  { word: 'Vuslat', origin: 'Arapça', meaning: 'Kavuşma, sevgiliye veya özlenen şeye ulaşma.' }
]

const filteredWords = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('tr-TR')
  if (!query) return words

  return words.filter(item =>
    `${item.word} ${item.origin} ${item.meaning}`.toLocaleLowerCase('tr-TR').includes(query)
  )
})

useHead(createPageSeoHead({
  title: 'Osmanlıca Kelimeler ve Anlamları',
  description: 'Arapça ve Farsça kökenli 22 Osmanlıca kelimeyi, kökenleri ve Türkçe anlamlarıyla inceleyin.',
  path: '/tr/kelimeler/osmanlica-kelimeler',
  type: 'article',
  lang: 'tr',
  breadcrumbs: [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Kelimeler', path: '/tr/kelimeler' },
    { name: 'Osmanlıca Kelimeler', path: '/tr/kelimeler/osmanlica-kelimeler' }
  ]
}))
</script>

<style scoped>
.words-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
}

.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.page-header h1 {
  margin: 0 auto 0.75rem;
  color: #1e293b;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  line-height: 1.2;
}

.intro {
  max-width: 720px;
  margin: 0 auto 1.5rem;
  color: #64748b;
  font-size: 1.05rem;
  line-height: 1.7;
}

.search-label {
  display: block;
  margin-bottom: 0.35rem;
  color: #334155;
  font-size: 0.9rem;
  font-weight: 600;
}

.search-input {
  width: 100%;
  max-width: 440px;
  padding: 0.7rem 0.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font: inherit;
}

.search-input:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.words-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.words-table th,
.words-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  line-height: 1.6;
  vertical-align: top;
}

.words-table thead th {
  background: #f8fafc;
  color: #334155;
  font-size: 0.9rem;
}

.words-table tbody tr:last-child th,
.words-table tbody tr:last-child td {
  border-bottom: 0;
}

.word-cell {
  min-width: 130px;
  color: #1e293b;
  font-weight: 700;
}

.words-table td:nth-child(2) {
  min-width: 110px;
}

.no-results {
  padding: 1.5rem;
  color: #64748b;
  text-align: center;
}

@media (max-width: 600px) {
  .words-container {
    padding-top: 1.5rem;
  }

  .words-table th,
  .words-table td {
    padding: 0.7rem;
  }
}
</style>
