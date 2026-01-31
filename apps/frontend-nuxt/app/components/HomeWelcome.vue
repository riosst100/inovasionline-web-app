<script setup>
import { ref, onMounted } from 'vue'

const showWelcome = ref(false)
const welcomeText = ref('')
const subtitleText = ref('')

onMounted(() => {
  // 1. hanya muncul saat login sukses
  const justLoggedIn = sessionStorage.getItem('justLoggedIn')
  if (justLoggedIn !== 'true') return

  // 2. cek login count
  const loginCount = Number(localStorage.getItem('loginCount') || '0') + 1
  localStorage.setItem('loginCount', loginCount.toString())

  if (loginCount === 1) {
    welcomeText.value = 'Welcome!'
    subtitleText.value =
      'Kami senang kamu bergabung bersama kami. Saatnya mulai berjualan atau memesan dengan mudah.'
  } else {
    welcomeText.value = 'Selamat datang kembali!'
    subtitleText.value =
      'Senang melihatmu kembali. Yuk lanjutkan aktivitasmu hari ini.'
  }

  showWelcome.value = true

  // 3. hapus flag login supaya cuma sekali per login
  sessionStorage.removeItem('justLoggedIn')
})

const closeWelcome = () => {
  showWelcome.value = false
}
</script>

<template>
  <section v-if="showWelcome" class="px-4 pt-[15px]">
    <div
      class="relative bg-gradient-to-r from-emerald-50 to-white
             border border-emerald-100
             rounded-2xl p-5 shadow-sm"
    >
      <!-- Close Button -->
      <button
        @click="closeWelcome"
        class="absolute top-3 right-4
               text-gray-400 hover:text-gray-600
               transition"
        aria-label="Close"
      >
        ✕
      </button>

      <div class="flex items-start gap-4">
        <div class="bg-emerald-500/10 rounded-full p-3 shrink-0">
          <NuxtImg
            src="/icon/party-card.png"
            class="w-10 h-10"
            placeholder
            format="avif,webp"
            quality="75"
          />
        </div>

        <div>
          <h2 class="text-sm font-semibold text-gray-800">
            {{ welcomeText }}
          </h2>
          <p class="text-sm text-gray-600 mt-1 leading-relaxed">
            {{ subtitleText }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
