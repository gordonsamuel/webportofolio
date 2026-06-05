<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-logo">{{ config.nickname }}<span>.</span></div>

      <p class="footer-copy">
        © {{ year }} {{ config.name }}. {{ t('footer.rights') }}
        &nbsp;{{ t('footer.made') }} <span class="footer-love">♥</span>
      </p>

      <div class="footer-social">
        <a :href="config.social.github" target="_blank" rel="noopener" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
        <a :href="config.social.instagram" target="_blank" rel="noopener" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a :href="config.social.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a :href="`mailto:${config.social.email}`" aria-label="Email">
          <i class="fas fa-envelope"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
defineProps({ t: Function, config: Object });
</script>
