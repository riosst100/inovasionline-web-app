<script setup lang="ts">
</script>

<template>
  <main class="privacy">
    <header class="privacy-header">
      <h1>Kebijakan Privasi</h1>
      <p class="subtitle">
        Privasi Anda penting bagi kami. Halaman ini menjelaskan bagaimana data
        pengguna dikelola dalam aplikasi.
      </p>
    </header>

    <section>
      <p>
        Aplikasi ini menghargai dan melindungi privasi setiap pengguna. Kami
        mengumpulkan informasi yang diperlukan untuk menyediakan layanan
        marketplace, termasuk jual beli produk, jasa, dan layanan servis.
      </p>
    </section>

    <section>
      <h2>Informasi yang Dikumpulkan</h2>
      <ul>
        <li>Informasi akun seperti nama dan email</li>
        <li>Data penggunaan aplikasi</li>
        <li>Informasi perangkat secara umum</li>
      </ul>
    </section>

    <section>
      <h2>Penggunaan Informasi</h2>
      <p>
        Informasi digunakan untuk menjalankan layanan aplikasi, komunikasi antar
        pengguna, dan peningkatan kualitas layanan.
      </p>
    </section>

    <section>
      <h2>Keamanan Data</h2>
      <p>
        Kami menjaga keamanan data pengguna dengan langkah-langkah yang wajar dan
        sesuai standar.
      </p>
    </section>

    <section>
      <h2>Pembagian Informasi</h2>
      <p>
        Kami tidak menjual atau membagikan data pribadi pengguna kepada pihak
        ketiga, kecuali diwajibkan oleh hukum.
      </p>
    </section>

    <footer class="privacy-footer">
      <p>
        Dengan menggunakan aplikasi ini, Anda menyetujui kebijakan privasi ini.
      </p>
    </footer>
  </main>
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
