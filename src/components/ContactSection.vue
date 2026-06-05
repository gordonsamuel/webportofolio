<template>
  <section id="contact" class="section contact">
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">
          {{ t('contact.title') }} <span class="em">{{ t('contact.title_em') }}</span>
        </h2>
        <p class="section-subtitle">{{ t('contact.subtitle') }}</p>
      </div>

      <div class="contact-inner">
        <!-- Social Links -->
        <div class="contact-info reveal">
          <h3>{{ t('contact.social_title') }}</h3>
          <p style="color:var(--color-warm-gray);font-size:15px;line-height:1.7;margin-bottom:32px;">
            {{ t('contact.subtitle') }}
          </p>

          <div class="social-links">
            <a :href="config.social.instagram" target="_blank" rel="noopener" class="social-link">
              <span class="social-link-icon" style="background:rgba(225,48,108,0.15);color:#e1306c;">
                <i class="fab fa-instagram"></i>
              </span>
              <div class="social-link-text">
                <span class="social-link-name">Instagram</span>
                <span class="social-link-val">
                  @{{ config.social.instagram.split('instagram.com/')[1] }}
                </span>
              </div>
            </a>

            <a :href="`mailto:${config.social.email}`" class="social-link">
              <span class="social-link-icon" style="background:rgba(83,81,243,0.15);color:#5351f3;">
                <i class="fas fa-envelope"></i>
              </span>
              <div class="social-link-text">
                <span class="social-link-name">Email</span>
                <span class="social-link-val">{{ config.social.email }}</span>
              </div>
            </a>

            <a :href="config.social.linkedin" target="_blank" rel="noopener" class="social-link">
              <span class="social-link-icon" style="background:rgba(10,102,194,0.15);color:#0a66c2;">
                <i class="fab fa-linkedin-in"></i>
              </span>
              <div class="social-link-text">
                <span class="social-link-name">LinkedIn</span>
                <span class="social-link-val">
                  {{ config.social.linkedin.split('linkedin.com/in/')[1] }}
                </span>
              </div>
            </a>

            <a :href="config.social.github" target="_blank" rel="noopener" class="social-link">
              <span class="social-link-icon" style="background:rgba(255,255,255,0.07);color:#fff;">
                <i class="fab fa-github"></i>
              </span>
              <div class="social-link-text">
                <span class="social-link-name">GitHub</span>
                <span class="social-link-val">
                  {{ config.social.github.replace('https://github.com/', '') }}
                </span>
              </div>
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <form class="contact-form reveal" @submit.prevent="sendEmail">
          <div class="form-group">
            <label for="cf-name">{{ t('contact.name') }}</label>
            <input id="cf-name" v-model="form.name" type="text" class="form-input"
              :placeholder="t('contact.name')" required />
          </div>
          <div class="form-group">
            <label for="cf-email">{{ t('contact.email') }}</label>
            <input id="cf-email" v-model="form.email" type="email" class="form-input"
              :placeholder="t('contact.email')" required />
          </div>
          <div class="form-group">
            <label for="cf-subject">{{ t('contact.subject') }}</label>
            <input id="cf-subject" v-model="form.subject" type="text" class="form-input"
              :placeholder="t('contact.subject')" required />
          </div>
          <div class="form-group">
            <label for="cf-message">{{ t('contact.message') }}</label>
            <textarea id="cf-message" v-model="form.message" class="form-input"
              :placeholder="t('contact.message')" rows="5" required></textarea>
          </div>

          <!-- Alert -->
          <div v-if="alert.show" :class="`form-alert ${alert.type}`">
            <i :class="alert.type === 'success' ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
            {{ alert.message }}
          </div>

          <button type="submit" class="btn btn-primary" :disabled="sending"
            style="width:100%;justify-content:center;">
            <i :class="sending ? 'fas fa-circle-notch fa-spin' : 'fas fa-paper-plane'"></i>
            {{ sending ? t('contact.sending') : t('contact.send') }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({ t: Function, config: Object });

const form = ref({ name: '', email: '', subject: '', message: '' });
const sending = ref(false);
const alert = ref({ show: false, type: '', message: '' });

const showAlert = (type, message) => {
  alert.value = { show: true, type, message };
  setTimeout(() => { alert.value.show = false; }, 6000);
};

const sendEmail = async () => {
  sending.value = true;
  try {
    // Gunakan backend PHP lokal yang memakai SMTP PHPMailer
    const endpoint = `http://localhost/webportofolio/send_email.php`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message
      })
    });

    const data = await res.json();
    if (data.success) {
      showAlert('success', props.t('contact.success'));
      form.value = { name: '', email: '', subject: '', message: '' };
    } else {
      throw new Error(data.message || 'Failed');
    }
  } catch (e) {
    showAlert('error', props.t('contact.error') + " " + e.message);
  } finally {
    sending.value = false;
  }
};

onMounted(() => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
</script>
