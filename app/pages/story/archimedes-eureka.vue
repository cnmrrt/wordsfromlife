<template>
  <Navbar />

  <main class="story-page">
    <article class="story-article">
      <header class="story-header">
        <p class="eyebrow">Science &amp; Ancient History</p>
        <h1>Archimedes and the “Eureka!” Moment</h1>
        <p class="intro">
          The story of Archimedes and his famous cry of “Eureka!” blends a
          royal puzzle, a sudden insight, and the origins of a principle in
          hydrostatics. Though the details come from a later account, the
          anecdote has endured as one of the best-known stories about a
          scientific discovery.
        </p>
      </header>

      <figure class="story-figure">
        <img
          src="https://wordsfromlife.com/static/img/story/archimedes-eureka-story.webp"
          alt="Archimedes shouting Eureka while standing in a bath"
          width="1408"
          height="1024"
        />
        <figcaption>
          The legendary bathhouse moment that inspired Archimedes’ “Eureka!”
        </figcaption>
      </figure>

      <section>
        <h2>The Problem: King Hiero’s Crown</h2>
        <p>
          The legend is set in third-century BCE Syracuse, in Sicily. King
          Hiero II had supplied a goldsmith with a specific mass of gold to
          make a sacred votive crown for the gods. The finished crown weighed
          exactly as much as the gold provided, but the king suspected the
          goldsmith might have kept some of the gold and replaced it with an
          equal weight of a cheaper metal, such as silver.
        </p>
        <p>
          Hiero wanted to test the crown without damaging or melting it. He
          turned to Archimedes, the mathematician and inventor who served as
          his scholar and advisor, to find a way to investigate its
          composition.
        </p>
      </section>

      <section>
        <h2>The Breakthrough in the Bath</h2>
        <p>
          Archimedes knew that silver is less dense than gold: for the same
          weight, silver occupies more volume. A crown mixed with silver would
          therefore take up more space than a pure gold crown of equal weight.
          The challenge was measuring the volume of an irregular object.
        </p>
        <p>
          According to the Roman architect Vitruvius, the insight came when
          Archimedes stepped into a bath filled to the brim and noticed water
          spilling over its edge. He realized that the displaced water
          corresponded to the volume of the submerged part of his body.
        </p>
        <p>
          The story says that, overcome by excitement, he leapt from the bath
          and ran through the streets of Syracuse shouting “Eureka! Eureka!” 
          Greek for “I have found it!”
        </p>
      </section>

      <section>
        <h2>Testing the Crown</h2>
        <p>
          In Vitruvius’s account, Archimedes compared the crown with equal
          weights of pure gold and silver by immersing them in water and
          comparing how much water they displaced:
        </p>
        <ol>
          <li>
            He took a gold sample and a silver sample, each equal in weight to
            the crown.
          </li>
          <li>
            He immersed the samples in water and compared their displacement.
            Because silver is less dense, it displaced more water than the
            equal-weight gold sample.
          </li>
          <li>
            He tested the crown in the same way. In the story, it displaced
            more water than the pure gold sample, suggesting that it contained
            a less-dense metal.
          </li>
        </ol>
        <p>
          This is the famous version of the test; it is not certain that
          Archimedes performed the experiment exactly as Vitruvius described.
        </p>
      </section>

      <section>
        <h2>History and Legend</h2>
        <p>
          Vitruvius is the source of the bath and crown story, writing centuries
          after Archimedes lived. Later thinkers, including Galileo, questioned
          whether measuring a small difference in overflow from a heavy crown
          would have been precise enough with the equipment available at the
          time.
        </p>
        <p>
          Archimedes may instead have used a more precise hydrostatic balance,
          comparing apparent weights in water. The account is debated, and the
          exact method he used, if any, to test the crown is not known.
        </p>
        <p>
          The broader scientific idea is buoyancy: a body immersed in a fluid
          experiences an upward force equal to the weight of the fluid it
          displaces. This principle is associated with Archimedes and became
          foundational to hydrostatics.
        </p>
      </section>

      <section>
        <h2>What Does “Eureka” Mean Today?</h2>
        <p>
          “Eureka” is still used as an exclamation when someone finds the
          answer to a difficult problem or makes a sudden discovery. Whether
          or not Archimedes ran through Syracuse as the legend says, the story
          captures the excitement of recognizing a solution and the lasting
          power of a good idea.
        </p>
      </section>

      <section class="related-author">
        <h2>Related Quotes</h2>
        <NuxtLink to="/authors/domenico-fetti-archimedes-quotes">
          Domenico-Fetti Archimedes Quotes
        </NuxtLink>
      </section>
    </article>
  </main>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

useHead(createPageSeoHead({
  title: 'Archimedes and the “Eureka!” Moment | Words From Life',
  description: 'Discover the story of Archimedes, King Hiero’s crown, the famous bath, and the history behind the “Eureka!” legend.',
  path: '/story/archimedes-eureka',
  image: '/static/img/story/archimedes-eureka-story.webp',
  type: 'article',
  articleSchema: true,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Stories', path: '/story' },
    { name: 'Archimedes and the Eureka Moment', path: '/story/archimedes-eureka' }
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
  max-width: 100%;
  margin: -1rem auto 2.5rem;
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

.related-author a {
  color: #8a5633;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.story-article p,
.story-article li {
  font-size: 1.05rem;
  line-height: 1.8;
}

.story-article p {
  margin: 0 0 1rem;
}

.story-article ol {
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
