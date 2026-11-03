<template>
  <Navbar_tr />

  <main class="synonyms-container">
    <header class="page-header">
      <p class="eyebrow">Türkçe kelime rehberi</p>
      <h1>Türkçedeki Eş Anlamlı Kelimeler</h1>
      <p class="intro">
        Türkçede aynı ya da birbirine yakın anlamlarda kullanılan kelimeleri keşfedin.
        Aradığınız kelimeyi, eş anlamlısını veya açıklamayı yazarak listeyi süzebilirsiniz.
      </p>
      <label class="search-label" for="synonym-search">Kelime ara</label>
      <input
        id="synonym-search"
        v-model="searchQuery"
        class="search-input"
        type="search"
        placeholder="Örnek: cevap, yanıt, karşılık..."
      >
    </header>

    <section class="table-wrapper" aria-label="Türkçe eş anlamlı kelimeler listesi">
      <table class="synonyms-table">
        <thead>
          <tr>
            <th scope="col">Kelime</th>
            <th scope="col">Eş anlamlıları</th>
            <th scope="col">Kullanım notu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredWords.length === 0">
            <td colspan="3" class="no-results">Aramanızla eşleşen kelime bulunamadı.</td>
          </tr>
          <tr v-for="item in filteredWords" :key="item.word">
            <th scope="row" class="word-cell">{{ item.word }}</th>
            <td class="synonym-cell">{{ item.synonyms.join(', ') }}</td>
            <td class="meaning-cell">{{ item.note }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <p class="usage-note">
      Eş anlamlı kelimeler her cümlede birbirinin yerine kullanılamayabilir. Seçim yaparken kelimenin
      cümledeki anlamını ve kullanım bağlamını dikkate alın.
    </p>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const searchQuery = ref('')

const synonymWords = [
  { word: 'Akıl', synonyms: ['us'], note: '“Us” daha çok yazılı ve edebî dilde kullanılır.' },
  { word: 'Amaç', synonyms: ['gaye'], note: 'Ulaşılmak istenen hedef veya sonuç.' },
  { word: 'Anı', synonyms: ['hatıra'], note: 'Geçmişte yaşanan ve hatırda kalan olay.' },
  { word: 'Anlam', synonyms: ['mana'], note: 'Bir sözün, işaretin veya durumun ifade ettiği şey.' },
  { word: 'Armağan', synonyms: ['hediye'], note: 'Birini sevindirmek için verilen şey.' },
  { word: 'Araç', synonyms: ['vasıta'], note: 'Bir işi gerçekleştirmeye yarayan şey.' },
  { word: 'Barış', synonyms: ['sulh'], note: 'Savaşın ve çatışmanın olmadığı durum.' },
  { word: 'Başarı', synonyms: ['muvaffakiyet'], note: 'İstenen sonuca ulaşma; “muvaffakiyet” daha resmî bir kullanımdır.' },
  { word: 'Beyaz', synonyms: ['ak'], note: 'Bir renk adı; “ak” özellikle kalıplaşmış ve edebî kullanımlarda görülür.' },
  { word: 'Cevap', synonyms: ['yanıt'], note: 'Bir soruya veya isteğe verilen karşılık.' },
  { word: 'Cümle', synonyms: ['tümce'], note: 'Bir yargı bildiren söz dizisi; “tümce” Türkçe karşılığıdır.' },
  { word: 'Deprem', synonyms: ['zelzele'], note: 'Yer kabuğunun sarsılması; “zelzele” daha eski bir sözcüktür.' },
  { word: 'Doğa', synonyms: ['tabiat'], note: 'İnsan eliyle yapılmamış varlıkların ve olayların bütünü.' },
  { word: 'Düş', synonyms: ['rüya'], note: 'Uyku sırasında görülen görüntü ve olaylar.' },
  { word: 'Düşünce', synonyms: ['fikir'], note: 'Zihinde oluşan görüş veya düşünme ürünü.' },
  { word: 'Endişe', synonyms: ['kaygı'], note: 'Olumsuz bir sonuç ihtimali karşısında duyulan tedirginlik.' },
  { word: 'Eser', synonyms: ['yapıt'], note: 'Emek veya yaratıcılık sonucu ortaya konan ürün.' },
  { word: 'Fakir', synonyms: ['yoksul'], note: 'Maddi imkânları sınırlı olan kişi veya durum.' },
  { word: 'Fayda', synonyms: ['yarar'], note: 'Bir şeyden sağlanan iyi veya kullanışlı sonuç.' },
  { word: 'Görev', synonyms: ['vazife'], note: 'Yapılması gereken iş veya sorumluluk.' },
  { word: 'Güç', synonyms: ['kuvvet'], note: 'Bağlama göre fiziksel dayanıklılık veya etki anlamında kullanılır.' },
  { word: 'Halk', synonyms: ['ahali'], note: 'Bir yerde yaşayan insanlar; “ahali” daha eski bir kullanımdır.' },
  { word: 'Hız', synonyms: ['sürat'], note: 'Hareketin veya gerçekleşmenin çabukluğu.' },
  { word: 'İmkân', synonyms: ['olanak'], note: 'Bir şeyin yapılabilmesini sağlayan şart veya kaynak.' },
  { word: 'Kalp', synonyms: ['yürek'], note: 'Organ anlamının yanı sıra duygu ve cesaret anlamlarında da kullanılır.' },
  { word: 'Kara', synonyms: ['siyah'], note: 'Renk anlamında eş anlamlıdır; “kara” ayrıca toprak parçası anlamına da gelir.' },
  { word: 'Konut', synonyms: ['mesken'], note: 'İnsanların barındığı ev veya yapı; “mesken” daha resmîdir.' },
  { word: 'Konuk', synonyms: ['misafir'], note: 'Bir yere veya eve çağrılan ya da gelen kişi.' },
  { word: 'Neden', synonyms: ['sebep'], note: 'Bir olayın veya durumun ortaya çıkmasına yol açan şey.' },
  { word: 'Nesil', synonyms: ['kuşak'], note: 'Yakın dönemlerde doğmuş, benzer yaşlardaki insanların oluşturduğu grup.' },
  { word: 'Olay', synonyms: ['vaka'], note: 'Ortaya çıkan veya gerçekleşen durum; “vaka” daha çok resmî dilde kullanılır.' },
  { word: 'Öğrenci', synonyms: ['talebe'], note: 'Öğrenim gören kişi; “talebe” daha eski bir kullanımdır.' },
  { word: 'Öğretmen', synonyms: ['muallim'], note: 'Öğretme işiyle görevli kişi; “muallim” daha eski bir sözcüktür.' },
  { word: 'Özgür', synonyms: ['hür'], note: 'Bağımsız ve serbest olan; “hür” daha çok kalıplaşmış ifadelerde görülür.' },
  { word: 'Öykü', synonyms: ['hikâye'], note: 'Yaşanmış veya tasarlanmış olayları anlatan kısa yazı türü.' },
  { word: 'Savaş', synonyms: ['harp'], note: 'Devletler veya topluluklar arasındaki silahlı mücadele.' },
  { word: 'Soru', synonyms: ['sual'], note: 'Bilgi edinmek için yöneltilen söz; “sual” daha eski bir kullanımdır.' },
  { word: 'Şahit', synonyms: ['tanık'], note: 'Bir olayı gören veya bilgisi bulunan kişi.' },
  { word: 'Şans', synonyms: ['talih'], note: 'Bir olayın olumlu veya olumsuz sonuçlanmasını etkileyen rastlantı.' },
  { word: 'Şehir', synonyms: ['kent'], note: 'Nüfusun ve yerleşimin yoğun olduğu büyük yerleşim alanı.' },
  { word: 'Ulus', synonyms: ['millet'], note: 'Ortak tarih ve kültür çevresinde birleşen insan topluluğu.' },
  { word: 'Yaşam', synonyms: ['hayat'], note: 'Canlı olma durumu ve yaşama süreci.' },
  { word: 'Yıl', synonyms: ['sene'], note: 'Dünyanın Güneş çevresindeki bir dönüşüne karşılık gelen zaman.' },
  { word: 'Zengin', synonyms: ['varsıl'], note: 'Varlıklı olan; “varsıl” Türkçe kökenli karşılığıdır.' }
]

const filteredWords = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('tr-TR')
  if (!query) return synonymWords

  return synonymWords.filter(item =>
    [item.word, ...item.synonyms, item.note]
      .some(value => value.toLocaleLowerCase('tr-TR').includes(query))
  )
})

useHead(createPageSeoHead({
  title: 'Türkçedeki Eş Anlamlı Kelimeler',
  description: 'Türkçede sık kullanılan eş anlamlı kelimeler ve kullanım notları. Kelime, eş anlamlı veya açıklama arayarak listeyi keşfedin.',
  path: '/tr/kelimeler/turkcedeki-es-anlamli-kelimeler',
  type: 'article',
  lang: 'tr',
  breadcrumbs: [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Kelimeler', path: '/tr/kelimeler' },
    { name: 'Eş Anlamlı Kelimeler', path: '/tr/kelimeler/turkcedeki-es-anlamli-kelimeler' }
  ]
}))
</script>

<style scoped>
.synonyms-container {
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

.synonyms-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.synonyms-table th,
.synonyms-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #edf2f7;
  vertical-align: top;
}

.synonyms-table thead th {
  background: #f8fafc;
  color: #475569;
  font-size: 0.9rem;
}

.synonyms-table tbody tr:last-child th,
.synonyms-table tbody tr:last-child td {
  border-bottom: 0;
}

.synonyms-table tbody tr:hover {
  background: #f8fafc;
}

.word-cell {
  min-width: 110px;
  color: #1e293b;
}

.synonym-cell {
  min-width: 150px;
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
  .synonyms-table th,
  .synonyms-table td {
    padding: 0.7rem;
    font-size: 0.9rem;
  }
}
</style>
