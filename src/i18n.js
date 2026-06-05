// src/i18n.js — Vue I18n instance
import { createI18n } from 'vue-i18n';

const messages = {
  id: {
    nav: {
      home: 'Beranda', about: 'Tentang', skills: 'Keahlian',
      repos: 'Proyek', contrib: 'Kontribusi', docs: 'Dokumen', contact: 'Kontak'
    },
    hero: {
      greeting: 'Halo, saya', cta_work: 'Lihat Karya',
      cta_contact: 'Kontak Saya'
    },
    docs: {
      title: 'Dokumen', title_em: 'Sertifikat',
      subtitle: 'Tugas akhir dan sertifikat saya',
      result_title: 'Dokumen',
    },
    about: { title: 'Tentang', title_em: 'Saya', subtitle: 'Kenalan yuk!' },
    skills: { title: 'Tech', title_em: 'Stack', subtitle: 'Teknologi yang saya kuasai' },
    repos: {
      title: 'Popular', title_em: 'Repositories',
      subtitle: 'Proyek open-source terpopuler di GitHub',
      stars: 'Bintang', forks: 'Fork', view: 'Lihat Repo',
      loading: 'Memuat repositori...', error: 'Gagal memuat.', no_desc: 'Tidak ada deskripsi.'
    },
    contrib: {
      title: 'GitHub', title_em: 'Kontribusi',
      subtitle: 'Aktivitas coding saya di GitHub',
      repos_label: 'Public Repos', followers_label: 'Followers', following_label: 'Following'
    },
    contact: {
      title: 'Mari', title_em: 'Bekerja Sama',
      subtitle: 'Tertarik? Kirim pesan — saya akan membalas segera!',
      name: 'Nama Lengkap', email: 'Alamat Email', subject: 'Subjek', message: 'Pesan',
      send: 'Kirim Pesan', sending: 'Mengirim...',
      success: 'Pesan terkirim! Terima kasih.',
      error: 'Gagal mengirim. Coba lagi.',
      social_title: 'Temukan Saya Di'
    },
    footer: { rights: 'Semua hak dilindungi.', made: 'Dibuat dengan' }
  },
  en: {
    nav: {
      home: 'Home', about: 'About', skills: 'Skills',
      repos: 'Projects', contrib: 'Contributions', docs: 'Documents', contact: 'Contact'
    },
    hero: {
      greeting: "Hi, I'm", cta_work: 'View My Work',
      cta_contact: 'Contact Me'
    },
    docs: {
      title: 'Documents', title_em: '& Certificates',
      subtitle: 'My final year project and certificates',
      result_title: 'Document',
    },
    about: { title: 'About', title_em: 'Me', subtitle: "Let's get acquainted!" },
    skills: { title: 'Tech', title_em: 'Stack', subtitle: 'Technologies I work with' },
    repos: {
      title: 'Popular', title_em: 'Repositories',
      subtitle: 'My most popular open-source projects on GitHub',
      stars: 'Stars', forks: 'Forks', view: 'View Repo',
      loading: 'Loading repositories...', error: 'Failed to load.', no_desc: 'No description.'
    },
    contrib: {
      title: 'GitHub', title_em: 'Contributions',
      subtitle: 'My coding activity on GitHub',
      repos_label: 'Public Repos', followers_label: 'Followers', following_label: 'Following'
    },
    contact: {
      title: "Let's", title_em: 'Work Together',
      subtitle: "Interested? Send a message — I'll reply soon!",
      name: 'Full Name', email: 'Email Address', subject: 'Subject', message: 'Message',
      send: 'Send Message', sending: 'Sending...',
      success: 'Message sent! Thank you.',
      error: 'Failed to send. Try again.',
      social_title: 'Find Me On'
    },
    footer: { rights: 'All rights reserved.', made: 'Made with' }
  }
};

const i18n = createI18n({
  legacy: false,
  locale: 'id',
  fallbackLocale: 'en',
  messages
});

export default i18n;
