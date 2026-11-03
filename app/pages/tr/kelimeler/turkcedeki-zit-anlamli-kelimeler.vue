<template>
  <Navbar_tr />

  <main class="antonyms-container">
    <header class="page-header">
      <h1>Türkçedeki Zıt Anlamlı Kelimeler</h1>
      <label class="search-label" for="antonym-search">Kelime ara</label>
      <input
        id="antonym-search"
        v-model="searchQuery"
        class="search-input"
        type="search"
        placeholder="Örnek: açık, kapalı, sıcak..."
      >
    </header>

    <section class="table-wrapper" aria-label="Türkçe zıt anlamlı kelimeler listesi">
      <table class="antonyms-table">
        <thead>
          <tr>
            <th scope="col">Kelime</th>
            <th scope="col">Zıt anlamlısı</th>
            <th scope="col">Kullanım notu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredWords.length === 0">
            <td colspan="3" class="no-results">Aramanızla eşleşen kelime bulunamadı.</td>
          </tr>
          <tr v-for="item in filteredWords" :key="item.word">
            <th scope="row" class="word-cell">{{ item.word }}</th>
            <td class="antonym-cell">{{ item.antonym }}</td>
            <td class="meaning-cell">{{ item.note }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <p class="usage-note">
      Bir kelimenin zıt anlamı cümledeki kullanımına göre değişebilir. Bazı sözcüklerin her bağlamda tek ve kesin bir karşıtı bulunmaz.
    </p>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const searchQuery = ref('')

const antonymWords = [
  { word: 'Açık', antonym: 'Kapalı', note: 'Kapı, pencere veya bir alanın durumu için kullanılır.' },
  { word: 'Açık', antonym: 'Örtülü', note: 'Üstü örtülmüş veya görünmeyecek biçimde kapatılmış olma anlamında.' },
  { word: 'Ağır', antonym: 'Hafif', note: 'Ağırlık veya taşıma güçlüğü bakımından karşıtlık bildirir.' },
  { word: 'Ağır', antonym: 'Hızlı', note: 'Hareketin yavaşlığı anlamında kullanıldığında karşıtı “hızlı”dır.' },
  { word: 'Az', antonym: 'Çok', note: 'Miktar veya sayı bakımından karşıtlık bildirir.' },
  { word: 'Başlangıç', antonym: 'Bitiş', note: 'Bir işin veya sürecin ilk ve son noktası.' },
  { word: 'Başlamak', antonym: 'Bitirmek', note: 'Bir işe girişmek ve işi sona erdirmek.' },
  { word: 'Barış', antonym: 'Savaş', note: 'Çatışmasızlık durumu ve silahlı mücadele.' },
  { word: 'Batı', antonym: 'Doğu', note: 'Yön bildiren sözcükler.' },
  { word: 'Bayat', antonym: 'Taze', note: 'Özellikle yiyeceklerin tazeliği için kullanılır.' },
  { word: 'Beyaz', antonym: 'Siyah', note: 'Renkleri karşılaştırırken kullanılan temel karşıtlık.' },
  { word: 'Büyük', antonym: 'Küçük', note: 'Boyut, miktar veya önem bakımından karşıtlık kurabilir.' },
  { word: 'Canlı', antonym: 'Cansız', note: 'Yaşamı olan ve yaşamı olmayan varlıklar için.' },
  { word: 'Cesur', antonym: 'Korkak', note: 'Tehlike karşısında gösterilen tutum bakımından.' },
  { word: 'Cömert', antonym: 'Cimri', note: 'Vermeye açık olma ve vermekten kaçınma tutumları.' },
  { word: 'Dargın', antonym: 'Barışık', note: 'İnsanlar arasındaki ilişkiyi anlatırken kullanılır.' },
  { word: 'Dar', antonym: 'Geniş', note: 'En veya kapsam bakımından karşıtlık bildirir.' },
  { word: 'Derin', antonym: 'Sığ', note: 'Su, çukur veya derinlik ölçüsü için kullanılır.' },
  { word: 'Dolu', antonym: 'Boş', note: 'İçinde bir şey bulunan ve bulunmayan durumlar.' },
  { word: 'Doğru', antonym: 'Yanlış', note: 'Bilginin doğruluğu veya bir davranışın uygunluğu için.' },
  { word: 'Dost', antonym: 'Düşman', note: 'Yakınlık ve karşıtlık bildiren kişi ilişkileri.' },
  { word: 'Erken', antonym: 'Geç', note: 'Beklenen veya belirlenen zamana göre.' },
  { word: 'Eski', antonym: 'Yeni', note: 'Zaman, kullanım veya yenilik bakımından.' },
  { word: 'Fakir', antonym: 'Zengin', note: 'Maddi varlık bakımından karşıtlık bildirir.' },
  { word: 'Giriş', antonym: 'Çıkış', note: 'Bir yere girilen ve çıkılan bölüm veya yön.' },
  { word: 'Güzel', antonym: 'Çirkin', note: 'Görünüş veya beğeni bakımından kullanılan karşıtlık.' },
  { word: 'Gündüz', antonym: 'Gece', note: 'Günün aydınlık ve karanlık zaman dilimleri.' },
  { word: 'Hızlı', antonym: 'Yavaş', note: 'Hareket veya gerçekleşme sürati bakımından.' },
  { word: 'İleri', antonym: 'Geri', note: 'Konum veya hareket yönünü belirtir.' },
  { word: 'İyi', antonym: 'Kötü', note: 'Nitelik veya değerlendirme bakımından karşıtlık kurar.' },
  { word: 'İthalat', antonym: 'İhracat', note: 'Bir ülkeye mal getirme ve ülkeden mal gönderme işlemleri.' },
  { word: 'Kalın', antonym: 'İnce', note: 'Bir cismin eni veya katmanının ölçüsü için.' },
  { word: 'Kâr', antonym: 'Zarar', note: 'Kazanç ve kayıp anlamında kullanılır.' },
  { word: 'Kolay', antonym: 'Zor', note: 'Bir işi yapmanın güçlük derecesini anlatır.' },
  { word: 'Kuru', antonym: 'Islak', note: 'Nem veya su bulunup bulunmaması bakımından.' },
  { word: 'Kuzey', antonym: 'Güney', note: 'Yön bildiren sözcükler.' },
  { word: 'Kısa', antonym: 'Uzun', note: 'Boy veya süre bakımından karşıtlık bildirir.' },
  { word: 'Mutlu', antonym: 'Mutsuz', note: 'Duygu durumunu anlatır.' },
  { word: 'Olumlu', antonym: 'Olumsuz', note: 'Bir duruma yönelik onay veya karşıt değerlendirme bildirir.' },
  { word: 'Sert', antonym: 'Yumuşak', note: 'Dokunma, fiziksel özellik veya tutum bakımından.' },
  { word: 'Sıcak', antonym: 'Soğuk', note: 'Isı derecesi için; mecaz anlamda da kullanılabilir.' },
  { word: 'Temiz', antonym: 'Kirli', note: 'Üzerinde kir bulunma durumuna göre.' },
  { word: 'Uzak', antonym: 'Yakın', note: 'Mesafe veya zaman bakımından.' },
  { word: 'Var', antonym: 'Yok', note: 'Bir şeyin bulunup bulunmadığını belirtir.' },
  { word: 'Yüksek', antonym: 'Alçak', note: 'Dikey konum veya ölçü bakımından.' },
  { word: 'Yaşlı', antonym: 'Genç', note: 'Yaş veya yenilik bakımından; kullanım bağlamı önemlidir.' },
  { word: 'Yarar', antonym: 'Zarar', note: 'Olumlu katkı ve olumsuz sonuç anlamlarında.' },
  { word: 'Yukarı', antonym: 'Aşağı', note: 'Konum veya hareket yönünü belirtir.' }
]

const filteredWords = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('tr-TR')
  if (!query) return antonymWords

  return antonymWords.filter(item =>
    [item.word, item.antonym, item.note]
      .some(value => value.toLocaleLowerCase('tr-TR').includes(query))
  )
})

useHead(createPageSeoHead({
  title: 'Türkçedeki Zıt Anlamlı Kelimeler',
  description: 'Türkçede sık kullanılan zıt anlamlı kelimeler ve kullanım notları. Kelime veya karşıt anlamını arayarak listeyi keşfedin.',
  path: '/tr/kelimeler/turkcedeki-zit-anlamli-kelimeler',
  type: 'article',
  lang: 'tr',
  breadcrumbs: [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Kelimeler', path: '/tr/kelimeler' },
    { name: 'Zıt Anlamlı Kelimeler', path: '/tr/kelimeler/turkcedeki-zit-anlamli-kelimeler' }
  ]
}))
</script>

<style scoped>
.antonyms-container {
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
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 10px rgb(15 23 42 / 5%);
}

.antonyms-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.antonyms-table th,
.antonyms-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #edf2f7;
  vertical-align: top;
}

.antonyms-table thead th {
  background: #f8fafc;
  color: #475569;
  font-size: 0.9rem;
}

.antonyms-table tbody tr:last-child th,
.antonyms-table tbody tr:last-child td {
  border-bottom: 0;
}

.antonyms-table tbody tr:hover {
  background: #f8fafc;
}

.word-cell {
  min-width: 110px;
  color: #1e293b;
}

.antonym-cell {
  min-width: 130px;
  color: #0369a1;
  font-weight: 600;
}

.meaning-cell {
  color: #475569;
  line-height: 1.55;
}

.no-results {
  padding: 2rem;
  color: #64748b;
  text-align: center;
}

.usage-note {
  margin: 1.5rem 0 0;
  padding: 1rem 1.25rem;
  border-left: 3px solid #94a3b8;
  background: #f8fafc;
  color: #475569;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .antonyms-table th,
  .antonyms-table td {
    padding: 0.7rem;
    font-size: 0.9rem;
  }
}
</style>
