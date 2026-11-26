<template>
  <footer class="site-footer">
    <div class="footer-content">
      <p class="copyright">&copy; {{ currentYear }} Words From Life</p>
      <nav class="footer-navigation" aria-label="Footer navigation">
        <NuxtLink to="/words/texting-dictionary">Texting & Chat Dictionary</NuxtLink>
      </nav>
      <nav class="social-links" aria-label="Social media">
        <a
          href="https://www.facebook.com/wordsfromlifesocial/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Words From Life on Facebook (opens in a new tab)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" />
          </svg>
        </a>
        <a
          href="https://x.com/wordsfromlife_"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Words From Life on X (opens in a new tab)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.4l7.3-8.4L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/wordsfromlifesocial"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Words From Life on Instagram (opens in a new tab)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2" />
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2" />
            <circle cx="17.5" cy="6.8" r="1.2" />
          </svg>
        </a>
        <a
          href="https://wordsfromlife.quora.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Words From Life on Quora (opens in a new tab)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11.5 2C6.5 2 3 5.8 3 11s3.5 9 8.5 9c1.2 0 2.3-.2 3.3-.7 1.1 1.8 2.7 2.7 4.5 2.7 1.1 0 2-.3 2.7-.8l-.8-1.7c-.5.3-1 .4-1.5.4-.9 0-1.6-.4-2.2-1.2 2.1-1.6 3.4-4.3 3.4-7.7 0-5.2-3.5-9-8.4-9Zm0 15.1c-2.8 0-4.5-2.3-4.5-6.1s1.7-6.1 4.5-6.1 4.5 2.3 4.5 6.1c0 1.8-.4 3.3-1.1 4.4-.6-1.3-1.1-2.8-1.5-4.3h-2.7c.5 2.5 1.4 4.7 2.5 6.3-.5-.2-1.1-.3-1.7-.3Z" />
          </svg>
        </a>
        <a
          href="https://pinterest.com/wordsfromlifesocial/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Words From Life on Pinterest (opens in a new tab)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.7.2-2.5l1.3-5.5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 2 0 3.4-2.6 3.4-5.7 0-2.4-1.6-4.2-4.4-4.2-3.2 0-5.2 2.4-5.2 5.1 0 .9.3 1.8.8 2.3.2.3.3.4.2.7l-.3 1c-.1.3-.4.4-.7.3-1.4-.6-2-2.1-2-3.9 0-2.9 2.4-6.4 7.3-6.4 3.9 0 6.4 2.8 6.4 5.8 0 4-2.2 7.1-5.4 7.1-1.1 0-2.1-.6-2.5-1.3l-.7 2.6c-.2.9-.7 1.7-1 2.4A10 10 0 1 0 12 2Z" />
          </svg>
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
  align-items: center;
  gap: 1rem;
}

.footer-navigation a {
  color: inherit;
  font-weight: 600;
  text-decoration: none;
}

.footer-navigation a:hover {
  color: #202a33;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.social-links a {
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: #000;
}

.social-links a:hover {
  opacity: 0.65;
}

.social-links svg {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
}

@media (max-width: 480px) {
  .footer-content {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
