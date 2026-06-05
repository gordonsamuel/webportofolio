<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container navbar-inner">
      <!-- Logo -->
      <a href="#hero" class="navbar-logo" @click.prevent="scrollTo('#hero')">
        {{ config.nickname }}<span>.</span>
      </a>

      <!-- Desktop nav links -->
      <ul class="navbar-links">
        <li v-for="item in navItems" :key="item.key">
          <a :href="`#${item.key}`" @click.prevent="scrollTo(`#${item.key}`)">
            {{ t(`nav.${item.key}`) }}
          </a>
        </li>
      </ul>

      <!-- Language switcher -->
      <div class="lang-toggle">
        <button class="lang-btn" :class="{ active: locale === 'id' }" @click="$emit('switch-locale', 'id')">ID</button>
        <button class="lang-btn" :class="{ active: locale === 'en' }" @click="$emit('switch-locale', 'en')">EN</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  locale: String,
  t: Function,
  config: Object
});

defineEmits(['switch-locale']);

const isScrolled = ref(false);
const navItems = [
  { key: 'about' }, { key: 'skills' }, { key: 'repos' },
  { key: 'contrib' }, { key: 'docs' }, { key: 'contact' }
];

const onScroll = () => { isScrolled.value = window.scrollY > 60; };

const scrollTo = (selector) => {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => window.addEventListener('scroll', onScroll));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>
