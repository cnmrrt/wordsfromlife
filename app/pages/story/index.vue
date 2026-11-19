<template>
  <div>
    <Navbar />

    <main class="stories-page">
      <header class="stories-header">
      <p class="eyebrow">Words From Life</p>
      <h1>Stories</h1>
      <p>Explore ideas from psychology, history, science, language, and philosophy.</p>
      </header>

      <div class="story-list">
        <article v-for="story in stories" :key="story.path" class="story-card">
          <NuxtLink :to="story.path" class="story-card-link">
            <img
              v-if="story.image"
              class="story-image"
              :src="story.image"
              :alt="story.imageAlt"
              loading="lazy"
            >
            <div class="story-card-copy">
              <p class="story-category">{{ story.category }}</p>
              <h2>{{ story.title }}</h2>
              <p class="story-description">{{ story.description }}</p>
              <span class="read-more">Read story <span aria-hidden="true">→</span></span>
            </div>
          </NuxtLink>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const stories = [
  {
    title: 'What the Placebo Effect Reveals About Perception and Medicine',
    category: 'Medicine & Psychology',
    description: 'Learn how expectation and conditioning shape the placebo effect, and why placebo controls help researchers evaluate medical treatments.',
    image: '/static/img/story/placebo-effect.jpeg',
    imageAlt: 'A man holds a small bottle of medicine as two other men observe',
    path: '/story/placebo-effect'
  },
  {
    title: 'What Is the Diderot Effect?',
    category: 'Psychology & Consumer Culture',
    description: 'How one new possession can trigger a cascade of purchases, and ways to make more intentional choices.',
    image: '/static/img/story/dennis-diderot-effect.webp',
    imageAlt: 'Denis Diderot writing at his desk in a richly furnished room',
    path: '/story/what-is-the-diderot-effect'
  },
  {
    title: 'Solomon’s Paradox: Why We Give Better Advice Than We Take',
    category: 'Psychology & Decision-Making',
    description: 'Explore why people may reason more wisely about other people’s problems than their own.',
    image: '/static/img/story/solomon-paradox.webp',
    imageAlt: 'King Solomon considering a difficult judgment',
    path: '/story/solomons-paradox'
  },
  {
    title: 'Archimedes and the “Eureka!” Moment',
    category: 'Science & Ancient History',
    description: 'Discover the story of Archimedes, King Hiero’s crown, and the history behind the famous “Eureka!” legend.',
    image: '/static/img/story/archimedes-eureka-story.webp',
    imageAlt: 'Archimedes and the famous Eureka moment',
    path: '/story/archimedes-eureka'
  },
  {
    title: 'What Does “Achilles’ Heel” Mean?',
    category: 'Mythology & Language',
    description: 'How a later version of the Greek myth gave us an enduring expression for a critical weakness.',
    image: '/static/img/story/achilles-heel.webp',
    imageAlt: 'Achilles seated among his armor and weapons',
    path: '/story/achilles-heel'
  },
  {
    title: 'The Great Depression: Causes, Impact, and Recovery',
    category: 'Economic History',
    description: 'Learn what caused the Great Depression, how it affected people around the world, and how recovery reshaped economic policy.',
    image: '/static/img/story/great-depression-people-lined-up.webp',
    imageAlt: 'People queue outside a free soup kitchen during the Great Depression',
    path: '/story/the-great-depression'
  },
  {
    title: 'The Ship of Theseus: A Paradox of Identity',
    category: 'Philosophy & Metaphysics',
    description: 'Explore the ancient thought experiment and the questions it raises about identity and change.',
    image: '/static/img/story/ship-of-theseus.webp',
    imageAlt: 'A ship at sea representing the Ship of Theseus paradox',
    path: '/story/ship-of-theseus'
  },
  {
    title: 'How Did the Months Get Their Names?',
    category: 'Words, History & Mythology',
    description: 'Discover the Roman gods, Latin numbers, festivals, and history behind the names of all twelve months.',
    path: '/story/how-did-months-get-their-names'
  },
  {
    title: 'Interesting Brand Names and the Stories Behind Them',
    category: 'Language, Culture & Business',
    description: 'Explore the origins and stories behind well-known names from business and popular culture.',
    path: '/story/interesting-brand-names'
  }
]

useHead(createPageSeoHead({
  title: 'Stories About Psychology, History, Science, and More | Words From Life',
  description: 'Explore all Words From Life stories, from psychology and science to history, language, and philosophy.',
  path: '/story',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Stories', path: '/story' }
  ]
}))
</script>

<style scoped>
.stories-page {
  width: min(1080px, 100%);
  margin: 0 auto;
  padding: 3rem 1.25rem 5rem;
}

.stories-header {
  max-width: 720px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.eyebrow,
.story-category {
  margin: 0 0 0.5rem;
  color: #9a643e;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.stories-header h1 {
  margin: 0 0 0.75rem;
  color: #202a33;
  font-size: clamp(2.25rem, 6vw, 3.5rem);
}

.stories-header > p:last-child {
  margin: 0;
  color: #4a5661;
  font-size: 1.1rem;
  line-height: 1.7;
}

.story-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 1rem;
}

.story-card {
  border: 1px solid #e8e3dc;
  border-radius: 0.75rem;
  background: #fff;
  transition: box-shadow 0.2s, transform 0.2s;
}

.story-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgb(32 42 51 / 10%);
}

.story-card-link {
  display: flex;
  height: 100%;
  flex-direction: column;
  color: inherit;
  text-decoration: none;
}

.story-image {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 0.7rem 0.7rem 0 0;
}

.story-card-copy {
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 1.25rem;
}

.story-card h2 {
  margin: 0 0 0.6rem;
  color: #202a33;
  font-size: 1.3rem;
  line-height: 1.35;
}

.story-description {
  margin: 0 0 1rem;
  color: #4a5661;
  line-height: 1.65;
}

.read-more {
  margin-top: auto;
  color: #9a643e;
  font-weight: 700;
}

@media (max-width: 600px) {
  .stories-page {
    padding: 2rem 1rem 3.5rem;
  }
}
</style>
