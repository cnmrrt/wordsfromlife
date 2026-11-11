<template>
  <Navbar />

  <main class="story-page">
    <article class="story-article">
      <header class="story-header">
        <p class="eyebrow">Philosophy &amp; Metaphysics</p>
        <h1>The Ship of Theseus: A Paradox of Identity</h1>
        <p class="intro">
          The <strong>Ship of Theseus</strong> (also known as Theseus’s paradox)
          is a classic philosophical thought experiment in
          <strong>metaphysics</strong> and <strong>identity theory</strong>. It
          questions whether an object that has had all of its components
          replaced remains fundamentally the same object.
        </p>
      </header>

      <figure class="story-figure">
        <img
          src="/static/img/story/ship-of-theseus.webp"
          alt="An ancient Greek ship sailing across the sea"
          width="1408"
          height="1024"
        />
        <figcaption>
          If every plank of a ship is replaced, is it still the same ship?
        </figcaption>
      </figure>

      <section>
        <h2>The Origin Story</h2>
        <p>
          The puzzle comes down to us through ancient Greek mythology and was
          recorded by the historian <strong>Plutarch</strong> in his
          <em>Life of Theseus</em> (around 75 CE):
        </p>
        <blockquote>
          <p>
            <em>
              The ship wherein Theseus and the youth of Athens returned from
              Crete had thirty oars, and was preserved by the Athenians down to
              the time of Demetrius Phalereus, for they took away the old planks
              as they decayed, putting in new and stronger timber in their
              place, insomuch that this ship became a standing example among the
              philosophers, for the logical question of things that grow; one
              side holding that the ship remained the same, and the other
              contending that it was not the same.
            </em>
          </p>
          <cite>Plutarch, <em>Life of Theseus</em></cite>
        </blockquote>
        <p>
          Later, the 17th-century philosopher <strong>Thomas Hobbes</strong>
          added a classic twist to the paradox: <strong>What if someone
          gathered all the discarded, rotten planks, stored them away, and
          eventually reassembled them into a second ship?</strong>
        </p>
        <p>
          That leaves us with two competing candidates for “The Real Ship of
          Theseus”:
        </p>
        <ol>
          <li>
            <strong>Ship A:</strong> The continuous ship sitting at the harbor,
            now made entirely of modern replacement parts.
          </li>
          <li>
            <strong>Ship B:</strong> The newly built ship made entirely from the
            original planks that were tossed aside.
          </li>
        </ol>
      </section>

      <section>
        <h2>The Philosophical Positions</h2>
        <p>
          Philosophers use distinct frameworks to resolve the paradox. Each
          emphasizes a different way of understanding what makes something the
          same object over time.
        </p>

        <h3>1. Spatiotemporal Continuity</h3>
        <ul>
          <li>
            <strong>Argument:</strong> Identity is defined by a continuous path
            through space and time.
          </li>
          <li>
            <strong>Outcome:</strong> <strong>Ship A</strong> is the real ship.
            Even though every plank was replaced, the process happened
            gradually over time without interrupting the ship’s physical
            existence or function.
          </li>
        </ul>

        <h3>2. Continuity of Parts / Material Identity</h3>
        <ul>
          <li>
            <strong>Argument:</strong> An object is defined strictly by the
            specific matter that makes it up.
          </li>
          <li>
            <strong>Outcome:</strong> <strong>Ship B</strong> is the real ship
            (or Ship A ceased being Theseus’s ship the moment the first original
            plank was removed). Under strict mereological essentialism, changing
            a single part creates a distinct new entity.
          </li>
        </ul>

        <h3>3. Four-Dimensionalism (Perdurantism)</h3>
        <ul>
          <li>
            <strong>Argument:</strong> Objects are four-dimensional “worms”
            extending through both space and time.
          </li>
          <li>
            <strong>Outcome:</strong> The ship consists of temporal parts. The
            ship at Time 1 and the ship at Time 2 are different temporal stages
            of the same 4D space-time object, so gradual plank replacement is
            just a standard temporal transition.
          </li>
        </ul>

        <h3>4. Conceptual Relativism / Nominalism</h3>
        <ul>
          <li>
            <strong>Argument:</strong> “The Ship of Theseus” is just a
            human-assigned label, not an intrinsic property of the universe.
          </li>
          <li>
            <strong>Outcome:</strong> Neither ship is “objectively” Theseus’s
            ship. The term is simply a convenience of language that breaks down
            when pushed to logical extremes.
          </li>
        </ul>
      </section>
    </article>
  </main>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

useHead(createPageSeoHead({
  title: 'The Ship of Theseus: A Paradox of Identity | Words From Life',
  description: 'Explore the Ship of Theseus paradox, its ancient origins, Hobbes’s twist, and four philosophical approaches to identity over time.',
  path: '/story/ship-of-theseus',
  image: '/static/img/story/ship-of-theseus.webp',
  type: 'article',
  articleSchema: true,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Stories', path: '/story' },
    { name: 'The Ship of Theseus', path: '/story/ship-of-theseus' }
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
