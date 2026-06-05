<template>
  <section v-if="autoDocuments.length" id="docs" class="section docs" style="background: #000;">
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">
          {{ t('docs.title') }} <span class="em">{{ t('docs.title_em') }}</span>
        </h2>
        <p class="section-subtitle">{{ t('docs.subtitle') }}</p>
      </div>

      <div class="repos-grid">
        <a 
          v-for="(doc, index) in autoDocuments" 
          :key="index"
          :href="doc.fileUrl" 
          target="_blank" 
          class="repo-card reveal"
        >
          <div class="repo-header">
            <i class="fas fa-file-pdf repo-icon" style="color: #f7523f;"></i>
            <div style="flex:1">
              <div class="repo-name">{{ doc.title }}</div>
            </div>
            <span class="repo-fork-badge" style="background: rgba(247, 82, 63, 0.15); color: #f7523f;">{{ doc.type }}</span>
          </div>

          <p class="repo-desc" style="display: -webkit-box; -webkit-line-clamp: 4; line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
            {{ doc.description }}
          </p>

          <div class="repo-footer" style="margin-top: auto; padding-top: 16px;">
            <span class="repo-stat" style="color: var(--color-cool-steel);">
              <i class="fas fa-external-link-alt"></i> Buka Dokumen
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';

const props = defineProps({ t: Function, config: Object });

// Otomatis mengambil semua file PDF di dalam folder public/assets/docs dan public/assets/sertifikat
// Karena file ada di public, kita bisa memotong '/public' dari awal path untuk mendapatkan URL yang benar
const pdfGlob = import.meta.glob('/public/assets/**/*.{pdf,PDF}', { as: 'url', eager: true });

const autoDocuments = computed(() => {
  const docs = [];
  
  // Format nama file menjadi judul yang lebih enak dibaca
  const formatTitle = (filename) => {
    return filename
      .replace(/\.pdf$/i, '') // Hilangkan ekstensi .pdf
      .replace(/[-_]/g, ' ')  // Ganti strip dan underscore jadi spasi
      .replace(/\b\w/g, l => l.toUpperCase()); // Huruf kapital di setiap kata
  };

  // Loop semua file PDF yang ditemukan
  for (const path in pdfGlob) {
    // path contoh: /public/assets/sertifikat/python.pdf
    const url = path.replace('/public', ''); // jadi: /assets/sertifikat/python.pdf
    const filename = path.split('/').pop();
    
    // Tentukan tipe berdasarkan nama folder
    let type = 'Dokumen';
    if (path.toLowerCase().includes('/sertifikat/')) {
      type = 'Sertifikat';
    } else if (path.toLowerCase().includes('/docs/') || path.toLowerCase().includes('laporan')) {
      type = 'Tugas Akhir';
    }

    docs.push({
      title: formatTitle(filename),
      type: type,
      description: `Dokumen ${type} - ${formatTitle(filename)}`,
      fileUrl: url
    });
  }
  
  // Jika di portfolio.js ada dokumen manual, gabungkan di paling atas
  const manualDocs = props.config.documents || [];
  
  // Hindari duplikasi jika dokumen manual memiliki URL yang sama dengan dokumen otomatis
  const autoFiltered = docs.filter(autoDoc => 
    !manualDocs.some(manualDoc => manualDoc.fileUrl === autoDoc.fileUrl)
  );

  return [...manualDocs, ...autoFiltered];
});

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
</script>
