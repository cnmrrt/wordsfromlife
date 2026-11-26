<template>
  <div>
    <Navbar_tr />

    <main class="story-page">
      <article class="story-article">
        <header class="story-header">
          <p class="eyebrow">Felsefe ve Metafizik</p>
          <h1>Theseus’un Gemisi: Kimlik Üzerine Bir Paradoks</h1>
          <p class="intro">
            <strong>Theseus’un Gemisi</strong> (Theseus paradoksu olarak da
            bilinir), <strong>metafizik</strong> ve <strong>kimlik kuramı</strong>
            alanlarında ele alınan klasik bir felsefi düşünce deneyidir.
            Bütün parçaları değiştirilen bir nesnenin temelde aynı nesne
            olarak kalıp kalmadığını sorgular.
          </p>
        </header>

        <figure class="story-figure">
          <img
            src="/static/img/story/ship-of-theseus.webp"
            alt="Antik Yunan döneminden bir gemi denizde ilerliyor"
            width="1408"
            height="1024"
          >
          <figcaption>
            Bir geminin her tahtası değiştirilirse, gemi hâlâ aynı gemi midir?
          </figcaption>
        </figure>

        <section>
          <h2>Hikâyenin Kökeni</h2>
          <p>
            Bu düşünce problemi Antik Yunan mitolojisine dayanır ve tarihçi
            <strong>Plutarkhos</strong> tarafından yaklaşık MS 75'te yazdığı
            <em>Theseus’un Hayatı</em> eserinde kayda geçirilmiştir:
          </p>
          <blockquote>
            <p>
              <em>
                Theseus’un ve Atinalı gençlerin Girit’ten döndüğü geminin otuz
                küreği vardı. Demetrios Phalereus zamanına dek Atinalılar
                tarafından korunmuştu; çürüyen eski tahtaları çıkarıp yerlerine
                yeni ve daha sağlam keresteler koyuyorlardı. Öyle ki bu gemi,
                büyüyen şeylerin kimliği üzerine filozoflar arasında süregelen
                tartışmada bir örnek hâline geldi: Bir taraf geminin aynı
                kaldığını, diğer taraf ise artık aynı gemi olmadığını savunuyordu.
              </em>
            </p>
            <cite>Plutarkhos, <em>Theseus’un Hayatı</em></cite>
          </blockquote>
          <p>
            Daha sonra, 17. yüzyıl filozofu <strong>Thomas Hobbes</strong>
            paradoksa klasik bir soru ekledi: <strong>Ya biri atılan çürümüş
            tahtaların hepsini toplayıp saklasa ve sonunda bunları yeniden
            birleştirerek ikinci bir gemi yapsa?</strong>
          </p>
          <p>
            Böylece “gerçek Theseus’un Gemisi” için iki aday ortaya çıkar:
          </p>
          <ol>
            <li>
              <strong>Gemi A:</strong> Limanda duran ve zaman içinde tüm
              parçaları yenilenmiş olan kesintisiz gemi.
            </li>
            <li>
              <strong>Gemi B:</strong> Atılıp bir kenara konmuş özgün
              tahtaların tamamından yeniden inşa edilen gemi.
            </li>
          </ol>
        </section>

        <section>
          <h2>Felsefi Yaklaşımlar</h2>
          <p>
            Filozoflar paradoksa farklı çerçevelerle yaklaşır. Her yaklaşım,
            bir nesneyi zaman içinde aynı nesne yapan özelliği farklı biçimde
            tanımlar.
          </p>

          <h3>1. Uzay-Zaman Sürekliliği</h3>
          <ul>
            <li>
              <strong>Görüş:</strong> Kimlik, uzay ve zamanda kesintisiz bir
              yol izlenmesiyle belirlenir.
            </li>
            <li>
              <strong>Sonuç:</strong> Gerçek gemi <strong>Gemi A</strong>'dır.
              Her tahtası değişmiş olsa da değişim zaman içinde aşamalı
              gerçekleşmiş, geminin fiziksel varlığı ve işlevi kesintiye
              uğramamıştır.
            </li>
          </ul>

          <h3>2. Parçaların Sürekliliği / Maddi Kimlik</h3>
          <ul>
            <li>
              <strong>Görüş:</strong> Bir nesneyi onu oluşturan belirli madde
              tanımlar.
            </li>
            <li>
              <strong>Sonuç:</strong> Gerçek gemi <strong>Gemi B</strong>'dir
              (ya da ilk özgün tahta çıkarıldığı anda Gemi A, Theseus’un gemisi
              olmaktan çıkmıştır). Katı parça özcülüğüne göre tek bir parçanın
              bile değişmesi yeni ve ayrı bir varlık oluşturur.
            </li>
          </ul>

          <h3>3. Dört Boyutçuluk (Perdüantizm)</h3>
          <ul>
            <li>
              <strong>Görüş:</strong> Nesneler, hem uzayda hem zamanda uzanan
              dört boyutlu “kurtçuklar” olarak düşünülebilir.
            </li>
            <li>
              <strong>Sonuç:</strong> Gemi zamansal parçalardan oluşur.
              Birinci andaki gemi ile ikinci andaki gemi, aynı dört boyutlu
              uzay-zaman nesnesinin farklı zamansal evreleridir. Tahtaların
              aşamalı biçimde değiştirilmesi olağan bir zaman içi dönüşümdür.
            </li>
          </ul>

          <h3>4. Kavramsal Görecilik / Adcılık</h3>
          <ul>
            <li>
              <strong>Görüş:</strong> “Theseus’un Gemisi”, evrenin içkin bir
              özelliği değil, insanların verdiği bir addır.
            </li>
            <li>
              <strong>Sonuç:</strong> Gemilerden hiçbiri nesnel olarak
              “Theseus’un gemisi” değildir. Bu ifade, mantıksal uçlara
              götürüldüğünde yetersiz kalan bir dil kolaylığıdır.
            </li>
          </ul>
        </section>
      </article>
    </main>
  </div>
</template>

<script setup>
import Navbar_tr from '~/components/Navbar_tr.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

useHead(createPageSeoHead({
  title: 'Theseus’un Gemisi: Kimlik Üzerine Bir Paradoks | Words From Life',
  description: 'Theseus’un Gemisi paradoksunu, Antik Yunan’daki kökenini, Hobbes’un eklediği soruyu ve kimliğe dair dört felsefi yaklaşımı keşfedin.',
  path: '/tr/hikaye/theseus-gemisi',
  image: '/static/img/story/ship-of-theseus.webp',
  type: 'article',
  articleSchema: true,
  lang: 'tr',
  alternateLanguages: [
    { lang: 'en', path: '/story/ship-of-theseus' },
    { lang: 'tr', path: '/tr/hikaye/theseus-gemisi' },
    { lang: 'x-default', path: '/story/ship-of-theseus' }
  ],
  breadcrumbs: [
    { name: 'Ana Sayfa', path: '/tr' },
    { name: 'Hikâyeler', path: '/tr' },
    { name: 'Theseus’un Gemisi', path: '/tr/hikaye/theseus-gemisi' }
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

.story-article h2,
.story-article h3 {
  color: #202a33;
  line-height: 1.3;
}

.story-article h2 {
  margin: 0 0 1rem;
  font-size: clamp(1.45rem, 3vw, 1.8rem);
}

.story-article h3 {
  margin: 1.75rem 0 0.75rem;
  font-size: 1.2rem;
}

.story-article p,
.story-article li {
  font-size: 1.05rem;
  line-height: 1.8;
}

.story-article p {
  margin: 0 0 1rem;
}

.story-article blockquote {
  margin: 1.5rem 0;
  padding: 0.25rem 1.25rem;
  border-left: 3px solid #b8794a;
  color: #4a5661;
}

.story-article blockquote p {
  margin-bottom: 0.5rem;
}

.story-article blockquote cite {
  font-size: 0.95rem;
  font-style: normal;
}

.story-article ol,
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
