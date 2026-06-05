<template>
  <section id="about" class="section about">
    <div class="container">
      <div class="about-inner reveal">
        <!-- Photo -->
        <div class="about-photo-wrap">
          <img
            v-if="showImg"
            :src="config.avatar"
            :alt="config.name"
            class="about-photo"
            @error="showImg = false"
          />
          <div v-else class="about-photo-placeholder">👨‍💻</div>
        </div>

        <!-- Text -->
        <div class="about-text">
          <span class="about-badge">{{ t('about.subtitle') }}</span>
          <h2 class="about-title">
            {{ t('about.title') }} <span class="em">{{ t('about.title_em') }}</span>
          </h2>
          <p class="about-bio">{{ config.bio[locale] }}</p>
          <a :href="config.social.github" target="_blank" rel="noopener" class="btn btn-primary">
            <i class="fab fa-github"></i> GitHub Profile
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({ t: Function, config: Object });
const { locale } = useI18n();

// showImg starts true; flips to false if image fails to load
const showImg = ref(Boolean(props.config.avatar));

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
</script>
