<template>
  <Navbar_tr />

  <main class="sivas-container">
    <header class="page-header">
      <p class="eyebrow">Yöresel Türkçe</p>
      <h1>Sivas Yöresine Ait Yöresel Kelimeler</h1>
      <p class="intro">
        Sivas ağzında kullanılan kelimeleri anlamları ve kısa açıklamalarıyla keşfedin.
        Bir kelimenin kullanımı ilçeye ve konuşana göre farklılık gösterebilir.
      </p>

      <label class="search-label" for="word-search">Kelime veya anlam ara</label>
      <input
        id="word-search"
        v-model="searchQuery"
        class="search-input"
        type="search"
        placeholder="Örnek: cılk, bulgur, kaban..."
      >
    </header>

    <section class="table-wrapper" aria-label="Sivas yöresel kelimeleri">
      <table class="words-table">
        <thead>
          <tr>
            <th scope="col">Kelime</th>
            <th scope="col">Anlamı ve kullanımı</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredWords.length === 0">
            <td colspan="2" class="no-results">Aramanızla eşleşen kelime bulunamadı.</td>
          </tr>
          <tr v-for="item in filteredWords" :key="item.word">
            <th scope="row" class="word-cell">{{ item.word }}</th>
            <td>{{ item.meaning }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="speech-notes" aria-labelledby="speech-heading">
      <h2 id="speech-heading">Sivas ağzında söyleyiş özellikleri</h2>
      <p>
        Günlük konuşmada bazı sesler yöreye özgü biçimlerde söylenebilir. Verilen
        örneklerde şimdiki zaman eki <strong>-yor</strong>, <strong>-iyir</strong>
        veya <strong>-üyür</strong> biçiminde duyulabilir: <em>geliyir</em>,
        <em>gidiyür</em>. Bu söyleyişler konuşurdan konuşura ve yöreden yöreye değişir.
      </p>
      <p>
        Konuşma dilinde ses değişimleri de görülebilir; ancak bunlar her kelimede ve
        her konuşurda aynı şekilde gerçekleşmez.
      </p>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const searchQuery = ref('')

const regionalWords = [
  { word: 'Aba', meaning: 'Abla veya anne için kullanılan samimi hitap.' },
  { word: 'Aşlık', meaning: 'Bulgur.' },
  { word: 'Böğür', meaning: 'Vücudun yan tarafı, özellikle kaburga altı bölgesi. Örnek: “Böğrüm ağrıdı.”' },
  { word: 'Cılk', meaning: 'Bozulmuş, çürümüş ya da işe yaramaz hâle gelmiş. Özellikle “cılk yumurta” denir.' },
  { word: 'Çirtik / Çentik', meaning: 'Küçük parça, ufak kesik veya çizik.' },
  { word: 'Döşetmek / Döşemek', meaning: 'Evi ya da odayı düzenlemek, döşemek.' },
  { word: 'Firik', meaning: 'Buğdayın veya ekinin henüz tam olgunlaşmamış, yeşil ve taze hâli.' },
  { word: 'Gakgoş / Gardaş', meaning: 'Dost, kardeş veya yakınlık bildiren samimi hitaplar.' },
  { word: 'Gocuk', meaning: 'Kışın giyilen kalın kaban ya da mont.' },
  { word: 'Kınto', meaning: 'Kısa boylu, tıknaz kimseler için kullanılan söz.' },
  { word: 'Mısmıl', meaning: 'Temiz, düzgün, güvenilir veya helal; anlamı kullanıldığı bağlama göre değişebilir.' },
  { word: 'Miyane', meaning: 'Un ve yağ kavrularak hazırlanan çorba türü.' },
  { word: 'Pırtı', meaning: 'Kumaş, eşya veya giysi.' },
  { word: 'Söbe', meaning: 'Yuvarlak, topaç gibi.' },
  { word: 'Yavan', meaning: 'Yağsız, sade yemek veya katıksız ekmek.' },
  { word: 'Zibil', meaning: 'Çok fazla, bol miktarda; yığınla.' }
]

const filteredWords = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('tr-TR')
  if (!query) return regionalWords

  return regionalWords.filter(item =>
    `${item.word} ${item.meaning}`.toLocaleLowerCase('tr-TR').includes(query)
  )
})

useHead(createPageSeoHead({
  title: 'Sivas Yöresel Kelimeleri ve Anlamları',
  description: 'Sivas ağzına ait yöresel kelimeleri, anlamlarını ve konuşma dilindeki söyleyiş özelliklerini keşfedin.',
  path: '/tr/kelimeler/sivas-yoresel-kelimeler',
  type: 'article',
  lang: 'tr',
  breadcrumbs: [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Kelimeler', path: '/tr/kelimeler' },
    { name: 'Sivas Yöresel Kelimeleri', path: '/tr/kelimeler/sivas-yoresel-kelimeler' }
  ]
}))
</script>

<style scoped>
.sivas-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
}

.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0 auto 0.75rem;
  color: #1e293b;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  line-height: 1.2;
}

.intro {
  max-width: 700px;
  margin: 0 auto 1.25rem;
  color: #64748b;
  font-size: 1.05rem;
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
  background: #fff;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
}

.words-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.words-table th,
.words-table td {
  padding: 0.85rem 1.2rem;
  border-bottom: 1px solid #edf2f7;
}

.words-table thead th {
  background: #f8fafc;
  color: #475569;
  font-size: 0.95rem;
  font-weight: 600;
}

.words-table tbody tr:hover {
  background: #f8fafc;
}

.word-cell {
  min-width: 180px;
  color: #1e293b;
  font-size: 1.05rem;
}

.no-results {
  padding: 3rem;
  color: #64748b;
  text-align: center;
}

.speech-notes {
  margin-top: 2rem;
  padding: 1.25rem 1.5rem;
  border-left: 4px solid #94a3b8;
  border-radius: 0 8px 8px 0;
  background: #f8fafc;
  color: #475569;
  line-height: 1.7;
}

.speech-notes h2 {
  margin: 0 0 0.5rem;
  color: #1e293b;
  font-size: 1.25rem;
}

.speech-notes p {
  margin: 0.5rem 0 0;
}

@media (max-width: 640px) {
  .words-table th,
  .words-table td {
    padding: 0.7rem 0.8rem;
    font-size: 0.9rem;
  }

  .word-cell {
    min-width: 135px;
  }

  .speech-notes {
    padding: 1rem;
  }
}
</style>
