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
        <input id="word-search" v-model="searchQuery" class="search-input" type="search"
          placeholder="Kelime, köken veya anlam yazın">
      </header>

      <p v-if="filteredWords.length === 0" class="no-results">
        Aramanızla eşleşen kelime bulunamadı.
      </p>
      <section v-else class="word-grid" aria-label="Osmanlıca kelimeler ve anlamları">
        <article v-for="item in filteredWords" :key="item.word" class="word-card">
          <h2 v-html="item.word"></h2>
          <p class="word-origin">{{ item.origin }}</p>
          <p class="word-meaning" v-html="item.meaning"></p>
        </article>
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
  { word: 'Abıhayat', origin: 'Farsça', meaning: 'İnsanlara ölümsüzlük veren, içildiğinde hayatı devam ettirdiği düşünülen hayat suyu.' },
  { word: 'Ahenk', origin: 'Farsça', meaning: 'Uyum, düzen, kulağa hoş gelen ses dizisi.' },
  { word: 'Asude', origin: 'Farsça', meaning: 'Sakin, huzurlu, rahat ve sıkıntısız olan.' },
  { word: 'Beyan', origin: 'Arapça', meaning: 'Açıklama, anlatma, ifade; açık ve anlaşılır söyleyiş.' },
  { word: '<a href="/tr/kelimeler/berceste">Berceste</a>', origin: 'Farsça', meaning: 'Seçkin, seçme; göze çarpan, üstün ve kıymetli.' },
  { word: 'Bîtap', origin: 'Farsça', meaning: 'Halsiz, yorgun, bitkin, takatsiz.' },
  { word: 'Cefa', origin: 'Arapça', meaning: 'Eziyet, sıkıntı, haksızlık; vefanın zıddı.' },
  { word: 'Cevher', origin: 'Arapça', meaning: 'Bir şeyin özünü oluşturan temel özellik veya değerli taş.' },
  { word: 'Destan', origin: 'Farsça', meaning: 'Tarihî veya kahramanca olayları anlatan uzun şiir veya hikâye.' },
  { word: 'Dilgir', origin: 'Farsça', meaning: 'Gönlü kırık, incinmiş, hüzünlü.' },
  { word: 'Elem', origin: 'Arapça', meaning: 'Üzüntü, acı, keder ve iç sıkıntısı.' },
  { word: 'Efkar', origin: 'Arapça', meaning: 'Düşünceler, tasalar, gam; kederlenmek.' },
  { word: 'Füsunkâr', origin: 'Farsça', meaning: 'Büyüleyici, etkileyici, insanı kendine çeken.' },
  { word: 'Feyz', origin: 'Arapça', meaning: 'Bolluk, bereket; ilham veya manevi aydınlanma.' },
  { word: 'Gaflet', origin: 'Arapça', meaning: 'Aymazlık, dalgınlık, gerçeği görememe hâli.' },
  { word: 'Garb', origin: 'Arapça', meaning: 'Batı; güneşin battığı yön.' },
  { word: 'Hamiyet', origin: 'Arapça', meaning: 'Koruyuculuk, vatan, millet veya değerler uğruna özveride bulunma duygusu.' },
  { word: 'Hazer', origin: 'Arapça', meaning: 'Sakınma, çekinme, ihtiyatlı davranma.' },
  { word: 'Hicran', origin: 'Arapça', meaning: 'Sevgiliden veya yurtlarından ayrılık acısı.' },
  { word: 'Hikmet', origin: 'Arapça', meaning: 'Bilgelik, derin anlayış; bir şeyin sebebi veya gizli anlamı.' },
  { word: 'İhtişam', origin: 'Arapça', meaning: 'Görkem, büyüklük, göz dolduran parlaklık.' },
  { word: '<a href="/tr/kelimeler/inziva">İnziva</a>', origin: 'Arapça', meaning: 'Bir köşeye çekilip kendi iç dünyasına yönelme, yalnız kalma.' },
  { word: 'İrfan', origin: 'Arapça', meaning: 'Derin bilgi, bilgelik; manevi anlayış ve sezgi.' },
  { word: 'Kemal', origin: 'Arapça', meaning: 'Olgunluk, yetkinlik, eksiksizlik.' },
  { word: 'Kudsiyet', origin: 'Arapça', meaning: 'Kutsallık, mukaddeslik, saygıya ve yüceltmeye layık olma.' },
  { word: 'Leva', origin: 'Arapça', meaning: 'Bayrak, sancak; eski yüzyıllarda idarî bölge anlamında kullanılan tabir.' },
  { word: 'Lütuf', origin: 'Arapça', meaning: 'İyilik, yardım, hoş davranış; ince ve bağışlayıcı ilgi.' },
  { word: 'Mahcubiyet', origin: 'Arapça', meaning: 'Utangaçlık, sıkılganlık, mahcup olma durumu.' },
  { word: 'Mecal', origin: 'Arapça', meaning: 'Güç, takat, dayanma ve işi yapabilme yetisi.' },
  { word: 'Medar', origin: 'Arapça', meaning: 'Dönme ekseni; vesile veya sebep.' },
  { word: 'Meftun', origin: 'Arapça', meaning: 'Vurulmuş, âşık olmuş, büyülenmiş, hayran kalmış.' },
  { word: 'Mihnet', origin: 'Arapça', meaning: 'Çile, sıkıntı, zahmet ve zorluk.' },
  { word: 'Münzevi', origin: 'Arapça', meaning: 'Köşesine çekilmiş, insanlardan uzak, yalnız yaşamayı seçen kimse.' },
  { word: 'Müselles', origin: 'Arapça', meaning: 'Üçgen; ayrıca kaynatılarak koyulaştırılmış şarap veya şerbet.' },
  { word: 'Neşe', origin: 'Farsça', meaning: 'Sevinç, canlılık, keyif ve mutluluk hali.' },
  { word: 'Nazar', origin: 'Arapça', meaning: 'Bakış, görüş; bazı inançlarda değen kötü göz.' },
  { word: 'Rahmet', origin: 'Arapça', meaning: 'Merhamet, acıma; Allah’ın bağışlama ve koruma niteliği.' },
  { word: 'Reva', origin: 'Farsça', meaning: 'Yakışır, uygun, caiz ve layık olan.' },
  { word: 'Rıza', origin: 'Arapça', meaning: 'İstekle kabullenme, gönül hoşluğu, onay.' },
  { word: 'Seyir', origin: 'Arapça', meaning: 'Gözle izleme, bakıp değerlendirme; hareket veya gelişim.' },
  { word: 'Şeb', origin: 'Farsça', meaning: 'Gece veya gecenin herhangi bir bölümü.' },
  { word: 'Sükûnet', origin: 'Arapça', meaning: 'Sessizlik, durgunluk, dinginlik, huzur.' },
  { word: 'Sermest', origin: 'Farsça', meaning: 'Sarhoş, kendinden geçmiş, coşkulu.' },
  { word: 'Teessür', origin: 'Arapça', meaning: 'Üzüntü, içlenme, kederli duygu.' },
  { word: 'Teveccüh', origin: 'Arapça', meaning: 'Yönelme, ilgi gösterme, güler yüz ve yakınlık.' },
  { word: 'Vahdet', origin: 'Arapça', meaning: 'Birlik, tek olma, bütünlük ve beraberlik.' },
  { word: 'Zarafet', origin: 'Arapça', meaning: 'İncelik, naziklik, zerafet ve zarif davranış.' },
  { word: 'Zevâl', origin: 'Arapça', meaning: 'Yok olma, sona erme; güneşin tepe noktasını geçmesi.' },
  { word: 'Ziya', origin: 'Arapça', meaning: 'Işık, aydınlık; aydınlatan veya parlayan şey.' },
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
  description: 'Arapça ve Farsça kökenli 50 Osmanlıca kelimeyi, kökenleri ve Türkçe anlamlarıyla inceleyin.',
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
  max-width: 100%;
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

.word-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.word-card {
  display: flex;
  flex-direction: column;
  min-height: 190px;
  padding: 1.25rem;
  background: #fff;
  border: 1px solid #dfe5ec;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(30, 41, 59, 0.06);
}

.word-card h2 {
  margin: 0 0 0.5rem;
  color: #1e293b;
  font-size: 1.35rem;
}

.word-card h2 a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.word-origin {
  margin: 0 0 0.9rem;
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.word-meaning {
  margin: 0;
  color: #334155;
  line-height: 1.65;
}

.no-results {
  padding: 1.5rem;
  color: #64748b;
  text-align: center;
}

@media (max-width: 900px) {
  .word-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .words-container {
    padding-top: 1.5rem;
  }

  .word-grid {
    grid-template-columns: 1fr;
  }
}
</style>
