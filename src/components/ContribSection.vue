<template>
  <section id="contrib" class="section contrib">
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">
          {{ t('contrib.title') }} <span class="em">{{ t('contrib.title_em') }}</span>
        </h2>
        <p class="section-subtitle">{{ t('contrib.subtitle') }}</p>
      </div>

      <!-- Stats Cards -->
      <div class="contrib-stats reveal">
        <div class="contrib-stat-card">
          <div class="contrib-stat-num">{{ stats.public_repos ?? '—' }}</div>
          <div class="contrib-stat-label">{{ t('contrib.repos_label') }}</div>
        </div>
        <div class="contrib-stat-card">
          <div class="contrib-stat-num">{{ stats.followers ?? '—' }}</div>
          <div class="contrib-stat-label">{{ t('contrib.followers_label') }}</div>
        </div>
        <div class="contrib-stat-card">
          <div class="contrib-stat-num">{{ stats.following ?? '—' }}</div>
          <div class="contrib-stat-label">{{ t('contrib.following_label') }}</div>
        </div>
      </div>

      <!-- Contribution Graph & Stats Images -->
      <div class="contrib-graph-wrap reveal">
        <h3>Contribution Activity</h3>
        <img
          :src="`https://ghchart.rshah.org/5351f3/${username}`"
          :alt="`${username} GitHub Contribution Chart`"
          loading="lazy"
        />
        <div class="contrib-imgs">
          <img
            :src="`https://github-readme-stats-eight-theta.vercel.app/api?username=${username}&show_icons=true&theme=transparent&title_color=e3a081&text_color=cccccc&icon_color=5351f3&bg_color=00000000&hide_border=true`"
            :alt="`${username} GitHub Stats`"
            loading="lazy"
            @error="$event.target.style.display='none'"
          />
          <img
            :src="`https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&title_color=e3a081&text_color=cccccc&bg_color=00000000&hide_border=true`"
            :alt="`${username} Top Languages`"
            loading="lazy"
            @error="$event.target.style.display='none'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({ t: Function, config: Object });
const username = computed(() => props.config.github.username);
const stats = ref({});

onMounted(async () => {
  try {
    const res = await fetch(`https://api.github.com/users/${username.value}`);
    if (res.ok) stats.value = await res.json();
  } catch { /* silently fail */ }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
</script>
