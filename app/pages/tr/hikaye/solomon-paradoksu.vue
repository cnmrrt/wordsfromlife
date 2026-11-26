<template>
  <div>
    <Navbar_tr />

    <main class="story-page">
      <article class="story-article">
        <header class="story-header">
          <p class="eyebrow">Psikoloji ve Karar Verme</p>
          <h1>Solomon Paradoksu: Neden Başkalarına Daha İyi Öğüt Veririz?</h1>
          <p class="intro">
            Solomon Paradoksu, yargılarımızda sık görülen bir farkı anlatır:
            İnsanlar başkalarının sorunları hakkında, kendi sorunlarına kıyasla
            daha sağduyulu düşünebilir. Kişisel bir ikilemi başka birinin
            başına gelmiş gibi hayal etmek, duygusal mesafe yaratarak durumu
            daha açık görmemizi sağlayabilir.
          </p>
        </header>

        <figure class="story-figure">
          <img
            src="/static/img/story/solomon-paradox.webp"
            alt="Kral Solomon zor bir hüküm üzerinde düşünürken"
            width="1408"
            height="1024"
          >
          <figcaption>
            Kral Solomon geleneksel anlatılarda bilgeliği ve adil hükümleriyle hatırlanır.
          </figcaption>
        </figure>

        <section>
          <h2>Neden Solomon Paradoksu Deniyor?</h2>
          <p>
            Adını bilgeliğiyle ün kazanmış, İncil'de anlatılan Kral
            Solomon'dan alır. “Solomon'un Hükmü” olarak bilinen öyküde,
            iki kadın aynı bebeğin annesi olduğunu iddia eder. Solomon
            çocuğun ikiye bölünmesini önerince, gerçek anne bebeğin zarar
            görmesini önlemek için kendi iddiasından vazgeçer.
          </p>
          <p>
            Kamusal bir anlaşmazlıkta verilen bilge hüküm ile Solomon'un
            kişisel ve siyasi kararlarına ilişkin anlatılar arasındaki
            karşıtlık, psikolojik paradoksa adını vermiştir. Kutsal Kitap
            anlatıları onun servetini, ilişkilerini ve kararlarını karmaşık,
            kimi zaman da birbiriyle çelişen yönleriyle aktarır. Bu terim,
            psikolojik bir tanı veya yaşamına ilişkin kesin bir tarihî
            değerlendirme değil, bir benzetmedir.
          </p>
        </section>

        <section>
          <h2>Psikolojik Mekanizma</h2>
          <p>
            Waterloo Üniversitesi'nden psikolog Igor Grossmann ile Michigan
            Üniversitesi'nden Ethan Kross'un yürüttüğü araştırmalar,
            insanların kendi sorunları ve başkalarının sorunları hakkında
            nasıl akıl yürüttüğünü inceledi. Bulgular, psikolojik mesafenin
            kişisel durumlarda bilgeliğe dayalı düşünmeyi kolaylaştırabileceğini
            düşündürüyor.
          </p>
          <ul>
            <li>
              <strong>Birinci kişi bakış açısı (kendimiz):</strong> Bir ikilem
              bizi doğrudan etkilediğinde güçlü duygular ve kendimizi koruma
              tepkileri dikkatimizi daraltabilir. Korku, gurur, anlık çıkarlar
              ve bilişsel önyargılar belirsizliği veya alternatif sonuçları
              değerlendirmeyi zorlaştırabilir.
            </li>
            <li>
              <strong>Üçüncü kişi bakış açısı (başkaları):</strong> Başka
              birine öğüt verirken genellikle duygusal olarak daha uzakta
              oluruz. Bu mesafe bilmediklerimizi kabul etmeyi, farklı
              olasılıkları göz önünde bulundurmayı ve daha dengeli tavsiyeler
              vermeyi kolaylaştırabilir.
            </li>
          </ul>
          <p>
            Bu etki, herkesin başkalarının sorunlarında daima daha bilge
            davrandığı anlamına gelmez. Duygusal açıdan yoğun ikilemler
            karşısında akıl yürütme biçimimizde görülebilen bir eğilimi
            tarif eder.
          </p>
        </section>
      </article>
    </main>
  </div>
</template>

<script setup>
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

useHead(createPageSeoHead({
  title: 'Solomon Paradoksu: Neden Başkalarına Daha İyi Öğüt Veririz? | Words From Life',
  description: 'Solomon Paradoksu’nu, psikolojik mesafeye ilişkin araştırmaları ve başkalarının sorunlarında neden daha sağduyulu düşünebildiğimizi keşfedin.',
  path: '/tr/hikaye/solomon-paradoksu',
  image: '/static/img/story/solomon-paradox.webp',
  type: 'article',
  articleSchema: true,
  lang: 'tr',
  alternateLanguages: [
    { lang: 'en', path: '/story/solomons-paradox' },
    { lang: 'tr', path: '/tr/hikaye/solomon-paradoksu' },
    { lang: 'x-default', path: '/story/solomons-paradox' }
  ],
  breadcrumbs: [
    { name: 'Ana Sayfa', path: '/tr' },
    { name: 'Hikâyeler', path: '/tr' },
    { name: 'Solomon Paradoksu', path: '/tr/hikaye/solomon-paradoksu' }
  ]
}))
</script>

<style scoped>
.story-page {
  padding: 3rem 1.25rem 5rem;
}

.story-article {
  max-width: 760px;
  margin: 0 auto;
  color: #29323b;
}

.story-header {
  margin-bottom: 3rem;
  padding: 2rem 0 2.5rem;
  border-bottom: 1px solid #e8e3dc;
}

.eyebrow {
  margin: 0 0 0.75rem;
  color: #9a643e;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-align: center;
  text-transform: uppercase;
}

.story-header h1 {
  max-width: 680px;
  margin: 0 auto 1.5rem;
  color: #202a33;
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  line-height: 1.12;
  text-align: center;
}

.intro {
  margin: 0;
  color: #4a5661;
  font-size: 1.15rem;
  line-height: 1.8;
}

.story-article section {
  margin: 0 0 2.5rem;
}

.story-figure {
  margin: -1rem 0 2.5rem;
}

.story-figure img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
}

.story-figure figcaption {
  margin-top: 0.6rem;
  color: #69747d;
  font-size: 0.9rem;
  text-align: center;
}

.story-article h2 {
  margin: 0 0 1rem;
  color: #202a33;
  font-size: clamp(1.45rem, 3vw, 1.8rem);
  line-height: 1.3;
}

.story-article p,
.story-article li {
  font-size: 1.05rem;
  line-height: 1.8;
}

.story-article p {
  margin: 0 0 1rem;
}

.story-article ul {
  margin: 0 0 1.25rem;
  padding-left: 1.5rem;
}

.story-article li {
  padding-left: 0.25rem;
  margin-bottom: 0.65rem;
}

.story-article li::marker {
  color: #b8794a;
}

@media (max-width: 600px) {
  .story-page {
    padding: 1.5rem 1rem 3.5rem;
  }

  .story-header {
    margin-bottom: 2rem;
    padding: 1.25rem 0 2rem;
  }
}
</style>
