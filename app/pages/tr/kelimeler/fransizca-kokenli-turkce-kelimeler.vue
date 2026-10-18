<template>
  <Navbar_tr />

  <div class="words-container">
    <header class="words-header">
      <h1>Fransızca Kökenli Türkçe Kelimeler</h1>
      <p class="subtitle">
        Türkçeye Fransızcadan geçen popüler kelimeler, özgün yazılışları ve anlamları.
      </p>

      <!-- Arama Kutusu -->
      <div class="controls">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Kelime, Fransızca aslı veya anlam ara..."
          class="search-input"
        />
      </div>
    </header>

    <main class="table-wrapper">
      <table class="words-table">
        <thead>
          <tr>
            <th>Türkçe Kelime</th>
            <th>Fransızca Aslı</th>
            <th>Anlamı / Açıklama</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredWords.length === 0">
            <td colspan="3" class="no-results">
              Eşleşen kelime bulunamadı.
            </td>
          </tr>
          <tr
            v-for="item in filteredWords"
            :key="item.id"
            :id="item.id"
          >
            <td class="word-cell">
              <strong>{{ item.word }}</strong>
            </td>
            <td class="french-cell">
              <em>{{ item.french_origin }}</em>
            </td>
            <td class="meaning-cell">
              {{ item.meaning }}
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script setup>
import Navbar_tr from '~/components/Navbar_tr.vue'
import { ref, computed } from 'vue'
import { useHead } from '#imports'

const searchQuery = ref('')

const wordsData = [
  { id: "aksesuar", word: "Aksesuar", french_origin: "accessoire", meaning: "Süs veya tamamlayıcı eşya" },
  { id: "aktor", word: "Aktör", french_origin: "acteur", meaning: "Erkek oyuncu / tiyatro veya sinema sanatçısı" },
  { id: "asansor", word: "Asansör", french_origin: "ascenseur", meaning: "Yük ve insan taşıma aracı" },
  { id: "bagaj", word: "Bagaj", french_origin: "bagage", meaning: "Yolcu eşyası veya taşıtların eşya gözü" },
  { id: "balkon", word: "Balkon", french_origin: "balcon", meaning: "Dışarıya doğru çıkıntılı üst kat platformu" },
  { id: "banliyoe", word: "Banliyö", french_origin: "banlieue", meaning: "Şehir çevresindeki yerleşim bölgesi" },
  { id: "bizon", word: "Bizon", french_origin: "bison", meaning: "Kuzey Amerika yaban öküzü" },
  { id: "bonkör", word: "Bonkör", french_origin: "bon cœur", meaning: "Eli açık, cömert ('iyi yürekli')" },
  { id: "buro", word: "Büro", french_origin: "bureau", meaning: "Çalışma odası, yazı masası veya danışma birimi" },
  { id: "dekor", word: "Dekor", french_origin: "décor", meaning: "Tiyatro, sinema veya mekân süslemesi" },
  { id: "detay", word: "Detay", french_origin: "détail", meaning: "Ayrıntı" },
  { id: "diferansiyel", word: "Diferansiyel", french_origin: "différentiel", meaning: "Matematikte: türev/değişim hesaba katma ve Otomotivte: virajlarda tekerleklerin farklı hızlarda dönmesini sağlayan dişli sistemi" },
  { id: "doktor", word: "Doktor", french_origin: "docteur", meaning: "Hekim veya akademik unvan" },
  { id: "ekran", word: "Ekran", french_origin: "écran", meaning: "Görüntülük, yansıtma yüzeyi" },
  { id: "eşarp", word: "Eşarp", french_origin: "écharpe", meaning: "Başörtüsü veya şal" },
  { id: "garaj", word: "Garaj", french_origin: "garage", meaning: "Taşıt park yeri veya bakım atölyesi" },
  { id: "hijyen", word: "Hijyen", french_origin: "hygiène", meaning: "Sağlık bilgisi, temizlik ilkesi" },
  { id: "iskonto", word: "İskonto", french_origin: "escompte", meaning: "İndirim" },
  { id: "jest", word: "Jest", french_origin: "geste", meaning: "El-kol hareketi veya incelikli davranış" },
  { id: "kavat", word: "Kravat", french_origin: "cravate", meaning: "Boyun bağı" },
  { id: "kuafor", word: "Kuaför", french_origin: "coiffeur", meaning: "Saç tasarımcısı, berber" },
  { id: "kultur", word: "Kültür", french_origin: "culture", meaning: "Ekin, toplumsal miras ve birikim" },
  { id: "lider", word: "Lider", french_origin: "leader", meaning: "Önder, yönlendiren kimse" },
  { id: "makyaj", word: "Makyaj", french_origin: "maquillage", meaning: "Yüz süsleme ve boyama sanatı" },
  { id: "mimar", word: "Mimar", french_origin: "architecte", meaning: "Yapı tasarlayan uzman" },
  { id: "mobilya", word: "Mobilya", french_origin: "mobilier", meaning: "Taşınabilir ev eşyası" },
  { id: "otel", word: "Otel", french_origin: "hôtel", meaning: "Konaklama tesisi" },
  { id: "paket", word: "Paket", french_origin: "paquet", meaning: "Sarılarak ambalajlanmış nesne" },
  { id: "parfum", word: "Parfüm", french_origin: "parfum", meaning: "Hoş koku, esans" },
  { id: "plaj", word: "Plaj", french_origin: "plage", meaning: "Deniz kıyısındaki kumsal" },
  { id: "prestij", word: "Prestij", french_origin: "prestige", meaning: "Saygınlık, itibar" },
  { id: "randevu", word: "Randevu", french_origin: "rendez-vous", meaning: "Buluşma sözü, görüşme zamanı" },
  { id: "restoran", word: "Restoran", french_origin: "restaurant", meaning: "Yemek yenilen işletme" },
  { id: "sabotaj", word: "Sabotaj", french_origin: "sabotage", meaning: "Baltalama, bozgunculuk" },
  { id: "sopır", word: "Şoför", french_origin: "chauffeur", meaning: "Sürücü" },
  { id: "televizyon", word: "Televizyon", french_origin: "télévision", meaning: "Uzakgörü, kitle iletişim aracı" }
]

const filteredWords = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return wordsData

  return wordsData.filter(item =>
    item.word.toLowerCase().includes(query) ||
    item.french_origin.toLowerCase().includes(query) ||
    item.meaning.toLowerCase().includes(query)
  )
})

useHead({
  title: 'Fransızca Kökenli Türkçe Kelimeler',
  htmlAttrs: {
    lang: 'tr'
  },
  meta: [
    {
      name: 'description',
      content: 'Günlük hayatta sıkça kullandığımız Fransızca kökenli Türkçe kelimeler, Fransızca asılları ve Türkçe anlamları tablosu.'
    },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: 'Fransızca Kökenli Türkçe Kelimeler' },
    {
      property: 'og:description',
      content: 'Günlük hayatta sıkça kullandığımız Fransızca kökenli Türkçe kelimeler, Fransızca asılları ve Türkçe anlamları tablosu.'
    },
    { property: 'og:url', content: 'https://wordsfromlife.com/tr/kelimeler/fransizca-kokenli-turkce-kelimeler' }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://wordsfromlife.com/tr/kelimeler/fransizca-kokenli-turkce-kelimeler'
    }
  ]
})
</script>

<style scoped>
.words-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.words-header {
  text-align: center;
  margin-bottom: 2rem;
}

.words-header h1 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.controls {
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
}

.table-wrapper {
  overflow-x: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
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

.words-table th {
  background-color: #f8fafc;
  color: #475569;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.words-table tbody tr:hover {
  background-color: #f8fafc;
}

.word-cell {
  color: #1e293b;
  font-size: 1.05rem;
}

.french-cell {
  color: #0369a1;
  font-weight: 500;
}

.meaning-cell {
  color: #334155;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #94a3b8;
  font-size: 1.05rem;
}

@media (max-width: 640px) {
  .words-table th,
  .words-table td {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>