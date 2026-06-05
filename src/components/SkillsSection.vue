<template>
  <section id="skills" class="section skills">
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">
          {{ t('skills.title') }} <span class="em">{{ t('skills.title_em') }}</span>
        </h2>
        <p class="section-subtitle">{{ t('skills.subtitle') }}</p>
      </div>

      <div class="skills-grid">
        <div
          v-for="(skill, i) in config.skills"
          :key="skill.name"
          class="skill-card reveal"
          :style="{ '--skill-color-faded': hexToRgba(skill.color, 0.12), transitionDelay: `${i * 50}ms` }"
        >
          <i :class="skill.icon" class="skill-icon" :style="{ color: skill.color }"></i>
          <span class="skill-name">{{ skill.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';

defineProps({ t: Function, config: Object });

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
</script>
