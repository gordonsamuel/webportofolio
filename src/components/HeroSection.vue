<template>
  <section id="hero" class="hero">
    <div class="hero-bg"></div>
    <div class="hero-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>

    <div class="hero-content">
      <p class="hero-greeting">{{ t('hero.greeting') }}</p>
      <h1 class="hero-name">
        <span class="accent">{{ config.name }}</span>
      </h1>
      <p class="hero-title">{{ config.title[locale] }}</p>
      <p class="hero-desc">{{ config.bio[locale] }}</p>
      <div class="hero-btns">
        <a href="#repos" class="btn btn-primary" @click.prevent="scrollTo('#repos')">
          <i class="fas fa-code"></i> {{ t('hero.cta_work') }}
        </a>
        <a href="#contact" class="btn btn-ghost" @click.prevent="scrollTo('#contact')">
          <i class="fas fa-paper-plane"></i> {{ t('hero.cta_contact') }}
        </a>
      </div>
    </div>

    <div class="hero-scroll" @click="scrollTo('#about')">
      <span>scroll</span>
      <span class="arrow">↓</span>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const props = defineProps({ t: Function, config: Object });
const { locale } = useI18n();

const scrollTo = (sel) => {
  const el = document.querySelector(sel);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};
</script>
