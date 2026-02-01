<script setup lang="ts">
</script>

<script setup>
useSeoMeta({
  title: 'Privacy Policy – Inovasi Online',
  description: 'Kebijakan Privasi Inovasi Online di www.inovasionline.com'
})
</script>

<template>
  <section class="prose max-w-none p-4">
    <h2>Privacy Policy</h2>
    <p>
      Inovasi Online (“kami”, “website”, “www.inovasionline.com”) berkomitmen
      untuk melindungi data pribadi dan privasi pengguna.
    </p>
    <br />
    <h2>Informasi yang Kami Kumpulkan</h2>
    <p>
      Kami dapat mengumpulkan informasi seperti nama, alamat email, alamat IP,
      dan data lain jika Anda mengirimkannya secara sukarela.
    </p>
    <br />
    <h2>Penggunaan Cookies</h2>
    <p>
      Kami menggunakan cookies untuk meningkatkan pengalaman pengguna dan
      menganalisis penggunaan situs.
    </p>
    <br />
    <h2>Google AdSense</h2>
    <p>
      Situs ini menggunakan Google AdSense untuk menampilkan iklan. Google
      menggunakan cookie DoubleClick untuk menayangkan iklan berdasarkan kunjungan Anda
      ke situs ini dan situs lain di Internet. Anda dapat menonaktifkan
      personalized ads melalui 
      <a href="https://policies.google.com/technologies/ads" target="_blank">
        Kebijakan Iklan Google
      </a>.
    </p>
    <br />
    <h2>Informasi Lokasi</h2>
    <p>
      Kantor kami berada di Desa Tiwulandu, Kec. Banjarharjo, Kab. Brebes,
      Jawa Tengah, Indonesia.
    </p>
    <br />
    <h2>Persetujuan</h2>
    <p>
      Dengan menggunakan situs ini, Anda setuju pada kebijakan privasi ini.
    </p>
  </section>
</template>


<style scoped>
.privacy {
  max-width: 820px;
  margin: 0 auto;
  padding: 24px 20px 40px;
  font-size: 15px;
  line-height: 1.7;
  color: #1f2937;
  background: #ffffff;
}

.privacy-header {
  margin-bottom: 24px;
}

.privacy-header h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 6px;
}

.subtitle {
  color: #6b7280;
  font-size: 14px;
}

section {
  margin-bottom: 22px;
}

h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
}

ul {
  padding-left: 18px;
}

ul li {
  margin-bottom: 6px;
}

.privacy-footer {
  margin-top: 28px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  color: #4b5563;
  font-size: 14px;
}

/* Mobile optimization */
@media (max-width: 480px) {
  .privacy {
    padding: 20px 16px 32px;
    font-size: 14px;
  }

  .privacy-header h1 {
    font-size: 20px;
  }
}
</style>
