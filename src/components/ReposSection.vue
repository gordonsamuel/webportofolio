<template>
  <section id="repos" class="section repos">
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">
          {{ t('repos.title') }} <span class="em">{{ t('repos.title_em') }}</span>
        </h2>
        <p class="section-subtitle">{{ t('repos.subtitle') }}</p>
      </div>

      <div class="repos-grid">
        <!-- Loading -->
        <div v-if="loading" class="repo-loading">
          <i class="fas fa-circle-notch"></i>
          <p style="margin-top:16px;">{{ t('repos.loading') }}</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="error-msg reveal">
        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #f87171; margin-bottom: 1rem;"></i>
        <h3 style="margin-bottom: 0.5rem;">Gagal Memuat Repositori</h3>
        <p style="color: var(--color-system-gray);">
          {{ typeof error === 'string' ? error : t('repos.error') }}
        </p>
      </div>

        <!-- Repos -->
        <a
          v-else
          v-for="repo in repos"
          :key="repo.id"
          :href="repo.html_url"
          target="_blank"
          rel="noopener"
          class="repo-card reveal"
        >
          <div class="repo-header">
            <i class="fas fa-book repo-icon"></i>
            <div style="flex:1">
              <div class="repo-name">{{ repo.name }}</div>
            </div>
            <span v-if="repo.fork" class="repo-fork-badge">Fork</span>
          </div>

          <p class="repo-desc">{{ repo.description || t('repos.no_desc') }}</p>

          <div class="repo-footer">
            <span v-if="repo.language" class="repo-lang">
              <span class="lang-dot" :style="{ background: langColor(repo.language) }"></span>
              {{ repo.language }}
            </span>
            <span class="repo-stat">
              <i class="fas fa-star"></i> {{ repo.stargazers_count }}
            </span>
            <span class="repo-stat">
              <i class="fas fa-code-branch"></i> {{ repo.forks_count }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps({ t: Function, config: Object });

const repos = ref([]);
const loading = ref(true);
const error = ref(false);

const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  PHP: '#4F5D95', Vue: '#41b883', HTML: '#e34c26', CSS: '#563d7c',
  Blade: '#f7523f', Java: '#b07219', 'C#': '#178600', Go: '#00ADD8',
  Rust: '#dea584', Ruby: '#701516', Shell: '#89e051', Swift: '#ffac45',
  Kotlin: '#A97BFF', Dart: '#00B4AB', default: '#8b949e'
};

const langColor = (lang) => LANG_COLORS[lang] || LANG_COLORS.default;

const setupObserver = () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.05 });
  // Observe all .reveal elements including newly rendered repo cards
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

onMounted(async () => {
  const username = props.config.github.username;
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=6&type=public`
    );
    if (!res.ok) {
      if (res.status === 403) throw new Error('Limit API GitHub tercapai (Max 60 request/jam). Silakan tunggu beberapa saat.');
      throw new Error('API error');
    }
    const data = await res.json();
    repos.value = data.slice(0, 6);
  } catch (e) {
    error.value = e.message || true;
  } finally {
    loading.value = false;
    await nextTick();
    setupObserver();
  }
});
</script>
