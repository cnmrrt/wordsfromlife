<template>
  <Navbar_tr />

  <main class="spelling-container">
    <header class="page-header">
      <h1>Türkçe'de En Çok Yapılan Yazım Hataları</h1>
    </header>

    <section class="examples" aria-label="Yanlış ve doğru yazım örnekleri">
      <article v-for="(item, index) in spellingExamples" :key="item.correct" class="example-card">
        <div class="example-heading">
          <span class="example-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <h2>{{ item.correct }}</h2>
        </div>
        <div class="comparison">
          <p class="incorrect">
            <span>Yanlış</span>
            <del>{{ item.incorrect }}</del>
          </p>
          <p class="correct">
            <span>Doğru</span>
            <strong>{{ item.correct }}</strong>
          </p>
        </div>
        <p class="explanation">{{ item.explanation }}</p>
      </article>
    </section>

    <section class="usage-note" aria-labelledby="yayinlamak-heading">
      <h2 id="yayinlamak-heading">Yayımlamak mı, yayınlamak mı?</h2>
      <p>
        İkisi de doğru yazılan sözcüklerdir; kullanım tercihi anlatılana göre değişir. Geleneksel kullanım ayrımında
        <strong>yayımlamak</strong>, kitap veya dergi gibi bir eseri yayımlama; <strong>yayınlamak</strong> ise
        radyo, televizyon ya da başka bir iletişim aracıyla program veya içerik sunma anlamında kullanılır.
      </p>
      <ul>
        <li>Yeni romanını gelecek ay <strong>yayımlayacak</strong>.</li>
        <li>Maç bu akşam televizyonda <strong>yayınlanacak</strong>.</li>
      </ul>
    </section>

    <p class="closing-note">
      Yazım konusunda emin olmadığınız kelimeleri Türk Dil Kurumunun Güncel Türkçe Sözlük ve Yazım Kılavuzu'ndan kontrol edebilirsiniz.
    </p>
  </main>
</template>

<script setup>
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const spellingExamples = [
  {
    incorrect: 'Sendemi geldin?',
    correct: 'Sen de mi geldin?',
    explanation: 'Buradaki “de” bağlaçtır ve ayrı yazılır. Soru eki “mi” de kendisinden önceki sözcükten ayrı yazılır.'
  },
  {
    incorrect: 'Ev de kimse yok.',
    correct: 'Evde kimse yok.',
    explanation: '“Evde” sözcüğündeki “-de”, bulunma durumu ekidir ve sözcüğe bitişik yazılır.'
  },
  {
    incorrect: 'Çünki',
    correct: 'Çünkü',
    explanation: 'Bağlaç olan sözcüğün doğru yazımı “çünkü” şeklindedir.'
  },
  {
    incorrect: 'Varmı? / Gelirmisin?',
    correct: 'Var mı? / Gelir misin?',
    explanation: 'Soru eki “mı/mi/mu/mü” ayrı yazılır. Kişi eki ise soru ekine bitişir: “misin”.'
  },
  {
    incorrect: 'Herşey / birşey',
    correct: 'Her şey / bir şey',
    explanation: '“şey” kelimesi her zaman ayrı yazılır.'
  },
  {
    incorrect: 'Hiç bir şey',
    correct: 'Hiçbir şey',
    explanation: '“Hiçbir” bitişik, “şey” ise ayrı yazılır.'
  },
  {
    incorrect: 'Yada',
    correct: 'Ya da',
    explanation: 'Seçenek bildiren “ya da” sözü ayrı yazılır.'
  },
  {
    incorrect: 'Yalnış / yanlız',
    correct: 'Yanlış / yalnız',
    explanation: 'Bu sözcüklerin doğru biçimleri “yanlış” ve “yalnız”dır.'
  },
  {
    incorrect: 'Herkez',
    correct: 'Herkes',
    explanation: 'Sözcük “herkes” biçiminde, son harfi “s” olacak şekilde yazılır.'
  },
  {
    incorrect: 'Ankarada',
    correct: 'Ankara’da',
    explanation: 'Özel adlara gelen çekim ekleri kesme işaretiyle ayrılır.'
  },
  {
    incorrect: 'Türkçe’nin',
    correct: 'Türkçenin',
    explanation: 'Özel adlardan türeyen sözcüklere gelen yapım ekleri kesme işaretiyle ayrılmaz.'
  },
  {
    incorrect: 'Türk’ler',
    correct: 'Türkler',
    explanation: 'Özel adlara gelen çokluk eki kesme işaretiyle ayrılmaz.'
  },
  {
    incorrect: 'Malesef',
    correct: 'Maalesef',
    explanation: 'Sözcük iki “a” ile, “maalesef” şeklinde yazılır.'
  },
  {
    incorrect: 'Ünvan',
    correct: 'Unvan',
    explanation: 'Sözcüğün doğru yazımı “unvan”dır.'
  },
  {
    incorrect: 'Orjinal',
    correct: 'Orijinal',
    explanation: 'Sözcükte “j” harfinden sonra “i” bulunur: “orijinal”.'
  },
  {
    incorrect: 'Baş vurmak',
    correct: 'Başvurmak',
    explanation: '“Başvurmak” anlamca kaynaşmış birleşik fiildir ve bitişik yazılır.'
  },
  {
    incorrect: 'Bir çok',
    correct: 'Birçok',
    explanation: 'Belirsizlik bildiren “birçok” sözcüğü bitişik yazılır.'
  },
  {
    incorrect: 'Gün aydın',
    correct: 'Günaydın',
    explanation: 'Selamlaşma sözü “günaydın” bitişik yazılır.'
  },
  {
    incorrect: 'Haketmek',
    correct: 'Hak etmek',
    explanation: '“Hak” sözcüğüyle kurulan bu yardımcı fiilli yapı ayrı yazılır.'
  }
]

useHead(createPageSeoHead({
  title: 'Türkçede En Çok Yapılan Yazım Hataları',
  description: 'Türkçede sık yapılan yazım yanlışları ve doğru yazımları: de/da, soru eki, birleşik kelimeler ve özel adlara gelen ekler.',
  path: '/tr/kelimeler/turkcede-en-cok-yapilan-yazim-hatalari',
  type: 'article',
  lang: 'tr',
  breadcrumbs: [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Kelimeler', path: '/tr/kelimeler' },
    { name: 'Yazım Hataları', path: '/tr/kelimeler/turkcede-en-cok-yapilan-yazim-hatalari' }
  ]
}))
</script>

<style scoped>
.spelling-container {
  max-width: 900px;
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
  max-width: 650px;
  margin: 0 auto;
  color: #64748b;
  font-size: 1.05rem;
}

.examples {
  display: grid;
  gap: 1rem;
}

.example-card {
  padding: 1.25rem 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 3px 10px rgb(15 23 42 / 4%);
}

.example-heading {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.example-number {
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 700;
}

.example-heading h2 {
  margin: 0;
  color: #1e293b;
  font-size: 1.25rem;
}

.comparison {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.comparison p {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
  padding: 0.75rem;
  border-radius: 6px;
  overflow-wrap: anywhere;
}

.comparison span {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.incorrect {
  background: #fff1f2;
  color: #9f1239;
}

.correct {
  background: #f0fdf4;
  color: #166534;
}

.explanation {
  margin: 0.85rem 0 0;
  color: #475569;
  line-height: 1.6;
}

.usage-note {
  margin-top: 1.5rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid #dbeafe;
  border-radius: 10px;
  background: #eff6ff;
  color: #334155;
  line-height: 1.7;
}

.usage-note h2 {
  margin: 0 0 0.5rem;
  color: #1e293b;
  font-size: 1.35rem;
}

.usage-note p {
  margin: 0;
}

.usage-note ul {
  margin: 0.75rem 0 0;
  padding-left: 1.25rem;
}

.closing-note {
  margin: 2rem 0 0;
  padding: 1rem 1.25rem;
  border-left: 3px solid #94a3b8;
  background: #f8fafc;
  color: #475569;
  line-height: 1.6;
}

@media (max-width: 520px) {
  .spelling-container {
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .example-card {
    padding: 1rem;
  }

  .comparison {
    grid-template-columns: 1fr;
  }
}
</style>
