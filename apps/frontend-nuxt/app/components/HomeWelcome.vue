<script setup>
import { ref, onMounted } from 'vue'

const showWelcome = ref(true)

onMounted(() => {
  // cek apakah user sudah menutup welcome message
  const hidden = localStorage.getItem('hideWelcomeMessage')
  if (hidden === 'true') {
    showWelcome.value = false
  }
})

const closeWelcome = () => {
  showWelcome.value = false
  localStorage.setItem('hideWelcomeMessage', 'true')
}
</script>

<template>
  <section class="px-4 pt-[15px]" v-if="showWelcome">
    <div
      class="relative bg-gradient-to-r from-emerald-50 to-white
             border border-emerald-100
             rounded-2xl p-5 shadow-sm"
    >
      <!-- Close Button -->
      <button
        @click="closeWelcome"
        style="right:20px"
        class="absolute top-3
               text-gray-400 hover:text-gray-600
               transition"
        aria-label="Close"
      >
        ✕
      </button>

      <div class="flex items-start gap-4">
        <div
          class="bg-emerald-500/10 text-emerald-600
                 rounded-full p-3 shrink-0"
        >
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
            Welcome, Rio Susanto!
          </h2>
          <p class="text-sm text-gray-600 mt-1 leading-relaxed">
            Kami senang kamu bergabung bersama kami.
            Saatnya mulai berjualan atau memesan apa pun dengan mudah dan nyaman.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
