<template>
  <Navbar />

  <main class="main" role="main">
    <h1>About Words From Life</h1>
    <div class="home-container">
      <section class="section">
        <div class="about-content">
          <p>
            Welcome to Words From Life, a collection of inspiring quotes, meaningful words, and timeless proverbs that capture the essence of human experience.
          </p>

          <h2>Our Mission</h2>
          <p>
            We believe that words have the power to inspire, motivate, and transform lives. Our platform brings together wisdom from authors, thinkers, and cultures around the world.
          </p>

          <h2>What You'll Find</h2>
          <ul>
            <li><strong>Authors:</strong> Inspiring quotes from renowned authors and thinkers</li>
            <li><strong>Words:</strong> Meaningful words with their definitions and context</li>
            <li><strong>Preverbs:</strong> Timeless proverbs and idioms that offer life wisdom</li>
          </ul>

          <h2>Contact</h2>
          <p>Have questions or suggestions? We'd love to hear from you!</p>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'

definePageMeta({
  title: 'About - Words From Life',
  meta: [
    { name: 'description', content: 'Learn about Words From Life, our mission, and what we offer.' },
    { property: 'og:title', content: 'About - Words From Life' },
    { property: 'og:description', content: 'Learn about Words From Life, our mission, and what we offer.' },
    { property: 'og:url', content: 'https://wordsfromlife.com/about' }
  ]
})
</script>

<style scoped>
.main {
  padding: 2rem 0;
}

.home-container {
  max-width: 100%;
  width: 1128px;
  padding: 0 24px;
  margin: 0 auto;
}

.section {
  padding: 0 0 50px 0;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.about-content h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.about-content p {
  margin-bottom: 1rem;
  color: #666;
}

.about-content ul {
  margin: 1rem 0;
  padding-left: 2rem;
}

.about-content li {
  margin-bottom: 0.5rem;
  color: #666;
}

@media (max-width: 767px) {
  .home-container {
    max-width: 90%;
    padding: 0 1rem;
  }
}
</style>
