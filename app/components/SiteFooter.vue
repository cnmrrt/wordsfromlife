<template>
  <footer class="site-footer">
    <div class="footer-content">
      <p class="copyright">&copy; {{ currentYear }} Words From Life</p>
      <nav class="social-links" aria-label="Social media">
        <a
          href="https://www.facebook.com/wordsfromlifesocial/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Words From Life on Facebook (opens in a new tab)"
        >
          Facebook
        </a>
        <a
          href="https://x.com/wordsfromlife_"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Words From Life on X (opens in a new tab)"
        >
          X
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  margin-top: 2rem;
  padding: 1.5rem 1.25rem;
  color: #4a5661;
  background: #f8f9fa;
  border-top: 1px solid #e5e5e5;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-width: 1128px;
  margin: 0 auto;
}

.copyright {
  margin: 0;
  font-size: 0.9rem;
}

.social-links {
  display: flex;
  gap: 1.25rem;
}

.social-links a {
  color: inherit;
  font-weight: 600;
  text-decoration: none;
}

.social-links a:hover {
  color: #202a33;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

@media (max-width: 480px) {
  .footer-content {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
