<template>
  <div>
    <NavBar :locale="locale" :t="t" @switch-locale="switchLocale" :config="config" />
    <main>
      <HeroSection :t="t" :config="config" />
      <AboutSection :t="t" :config="config" />
      <SkillsSection :t="t" :config="config" />
      <ReposSection :t="t" :config="config" />
      <ContribSection :t="t" :config="config" />
      <DocsSection :t="t" :config="config" />
      <ContactSection :t="t" :config="config" />
    </main>
    <Footer :t="t" :config="config" />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import config from '@/config/portfolio.js';
import NavBar from '@/components/NavBar.vue';
import HeroSection from '@/components/HeroSection.vue';
import AboutSection from '@/components/AboutSection.vue';
import SkillsSection from '@/components/SkillsSection.vue';
import ReposSection from '@/components/ReposSection.vue';
import ContribSection from '@/components/ContribSection.vue';
import DocsSection from '@/components/DocsSection.vue';
import ContactSection from '@/components/ContactSection.vue';
import Footer from '@/components/Footer.vue';

const { t, locale } = useI18n();

const switchLocale = (lang) => { locale.value = lang; };
</script>
