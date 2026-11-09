<template>
  <Navbar />

  <main class="story-page">
    <article class="story-article">
      <header class="story-header">
        <p class="eyebrow">Mythology &amp; Language</p>
        <h1>What Does “Achilles’ Heel” Mean?</h1>
        <p class="intro">
          “Achilles’ heel” means a single, decisive weakness in someone or
          something that is otherwise strong. The expression comes from a later
          version of the Greek myth in which the hero Achilles was invulnerable
          everywhere except the spot where his mother held him while dipping
          him in the River Styx.
        </p>
      </header>

      <figure class="story-figure">
        <img
          src="https://wordsfromlife.com/static/img/story/achilles-heel.webp"
          alt="Achilles seated among his armor and weapons"
          width="1024"
          height="576"
        />
        <figcaption>
          Achilles became a lasting symbol of strength undone by one vulnerable
          point.
        </figcaption>
      </figure>

      <section>
        <h2>The Myth of Achilles’ Vulnerable Heel</h2>
        <p>
          Achilles was the greatest Greek warrior in the Trojan War. His
          mother, the sea-nymph Thetis, wanted to make him immortal. In the
          familiar later version of the myth, she dipped the infant Achilles
          into the River Styx, the river of the underworld. She held him by one
          heel, leaving that small spot untouched by the river’s protection.
        </p>
        <p>
          Years later, during the Trojan War, the Trojan prince Paris shot
          Achilles with an arrow. In the best-known telling, it struck his
          vulnerable heel and killed him.
        </p>
      </section>

      <section>
        <h2>Why the Phrase Took Hold</h2>
        <p>
          The image is memorable: a nearly invincible hero brought down by one
          overlooked point. Today, an “Achilles’ heel” can be a person’s,
          organization’s, plan’s, or system’s critical vulnerability not
          necessarily a physical flaw.
        </p>
        <p>
          For example, “The company’s Achilles’ heel is its dependence on one
          supplier” means that reliance is a weak point that could undermine
          the entire business.
        </p>
      </section>

      <section>
        <h2>The Heel Story Is Later Than You Might Think</h2>
        <p>
          The vulnerable-heel episode does not appear in Homer’s
          <em>Iliad</em>, the central ancient account of Achilles in the Trojan
          War. Ancient depictions of Achilles’ death sometimes show an arrow
          wound in his torso as well as his heel, suggesting that the
          familiar heel-only version developed later.
        </p>
        <p>
          The earliest clear written account of Achilles being dipped in the
          Styx is usually traced to the first-century AD Roman poet Statius and
          his unfinished epic, the <em>Achilleid</em>. Some scholarship also
          argues that Roman sources placed the vulnerable spot at the ankle,
          particularly at the talus bone, rather than at the heel as it is
          usually imagined today.
        </p>
      </section>

      <section>
        <h2>From Myth to English Idiom</h2>
        <p>
          The expression entered English as a metaphor much later than the
          ancient myths. In 1810, Samuel Taylor Coleridge used a related image,
          calling Ireland “that vulnerable heel of the British Achilles.” The
          established idiom is generally dated to 1840.
        </p>
        <p>
          The legend also inspired the name of the Achilles tendon, the strong
          tendon connecting the calf muscles to the heel bone. This anatomical
          name reflects the myth rather than an ancient medical description.
        </p>
        <p>
          In short, Achilles’ heel began as a later elaboration of a heroic
          myth and became one of the most enduring metaphors for a critical
          weakness.
        </p>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>
        <h3>Does Homer mention the River Styx in the <em>Iliad</em>?</h3>
        <p>
          The Styx appears in Homeric poetry, but the story of Thetis dipping
          Achilles into it to make him invulnerable is not told in the
          <em>Iliad</em>.
        </p>
        <h3>Who killed Achilles?</h3>
        <p>
          In the familiar myth, the Trojan prince Paris kills Achilles with an
          arrow during the Trojan War. The details vary among ancient and later
          accounts.
        </p>
        <h3>How did the Achilles tendon get its name?</h3>
        <p>
          It was named after Achilles because the tendon connects to the heel,
          the vulnerable spot in the later version of his myth.
        </p>
      </section>
    </article>
  </main>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

useHead(createPageSeoHead({
  title: 'What Does “Achilles’ Heel” Mean? Myth and Idiom | Words From Life',
  description: 'Learn the meaning of “Achilles’ heel,” how the vulnerable-heel story developed, and how the Greek myth became an enduring English idiom.',
  path: '/story/achilles-heel',
  image: '/static/img/story/achilles-heel.webp',
  type: 'article',
  articleSchema: true,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Stories', path: '/story' },
    { name: 'Achilles’ Heel', path: '/story/achilles-heel' }
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

.story-article h2 {
  margin: 0 0 1rem;
  color: #202a33;
  font-size: clamp(1.45rem, 3vw, 1.8rem);
  line-height: 1.3;
}

.story-article h3 {
  margin: 1.5rem 0 0.5rem;
  color: #29323b;
  font-size: 1.15rem;
}

.story-article p {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  line-height: 1.8;
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
