<script setup>
defineProps({
  error: Object
})

const goHome = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-6">
    <div class="max-w-md text-center bg-white rounded-2xl shadow-xl p-10">

      <!-- Kode Error -->
      <h1 class="text-7xl font-extrabold text-gray-900">
        {{ error?.statusCode || 404 }}
      </h1>

      <!-- Judul -->
      <h2 class="mt-4 text-2xl font-semibold text-gray-800">
        Halaman Belum Tersedia
      </h2>

      <!-- Deskripsi -->
      <p class="mt-4 text-gray-600 leading-relaxed">
        Fitur masih dalam tahap pengembangan.
        Silahkan coba lagi nanti.
        <br class="hidden sm:block" />
        Ikuti update terbaru kami melalui social media.
      </p>

      <!-- Social Media -->
      <div class="mt-6 flex justify-center gap-4">
        <a
          href="#"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition"
          aria-label="TikTok"
        >
          TikTok
        </a>

        <a
          href="#"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:opacity-80 transition"
          aria-label="Facebook"
        >
          FB
        </a>

        <a
          href="#"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-pink-600 text-white hover:opacity-80 transition"
          aria-label="Instagram"
        >
          IG
        </a>
      </div>

      <!-- Tombol -->
      <button
        @click="goHome"
        class="mt-8 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition font-medium"
      >
        Kembali ke Home
      </button>
    </div>
  </div>
</template>
