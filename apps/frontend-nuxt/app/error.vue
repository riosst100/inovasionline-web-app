<script setup>
import HomeHeader from './components/HomeHeader.vue'
import { Icon } from '@iconify/vue'

defineProps({
  error: Object
})

const goHome = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
    <HomeHeader />

    <div class="flex items-center justify-center px-4 py-[30px]">
      <div class="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">

        <NuxtImg
          placeholder
          format="avif,webp"
          quality="75"
          src="/illustration/error_404.webp" />

        <!-- Judul -->
        <div class="text-[18px] font-semibold text-gray-900">
          Wah! Halaman tidak ditemukan
        </div>
        <!-- Deskripsi -->
        <p class="mt-2 text-gray-600 leading-relaxed">
          Halaman yang kamu cari masih dalam proses pengembangan. Coba cek lagi nanti ya.
        </p>
        <p class="mt-10 text-gray-600 leading-relaxed">
          Biar nggak ketinggalan update terbaru, jangan lupa follow sosial media kami ya!
        </p>

        <!-- Social Media -->
        <div class="mt-4 flex justify-center gap-[10px]">
          <a
            href="#"
            class="logo-link"
            aria-label="TikTok"
          >
            <Icon icon="logos:tiktok-icon" width="32" height="32" />
            <div class="social-media-username">@inovasi.online</div>
          </a>

          <a
            href="#"
            class="logo-link"
            aria-label="Facebook"
          >
            <Icon icon="logos:facebook" width="32" height="32" />
            <div class="social-media-username">@inovasi.online</div>
          </a>

          <a
            href="#"
            class="logo-link"
            aria-label="Instagram"
          >
            <NuxtImg
            placeholder
            format="avif,webp"
            quality="75" src="/logo/instagram.webp" style="width: 32px;" />
            <div class="social-media-username">@inovasi.online</div>
          </a>
        </div>
      </div>
    </div>

    <BottomNavbar />
  </div>
</template>

<style scoped>
  .social-media-username {
    margin-top: 5px;
    font-size: 12px;
  }
  .logo-link {
    justify-items: center;
  }
</style>