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
import { Icon } from '@iconify/vue'

const actions = [
  {
    id: 1,
    label: 'Pesanan',
    icon: 'mdi:clipboard-text-outline',
    badge: 3,
  },
  {
    id: 2,
    label: 'Notifikasi',
    icon: 'mdi:bell-outline',
    badge: 5,
  },
  {
    id: 3,
    label: 'Pesan',
    icon: 'mdi:chat-processing-outline',
    badge: 2,
  },
]
</script>

<template>
  <section class="px-4 pt-4">
    <div class="rounded-xl bg-white border p-2">
      <p class="mb-4 inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
        <Icon icon="iconoir:eye" style="width:15px;height:15px;margin-right:5px" /> Hanya terlihat oleh Anda
      </p>
      <div class="flex items-center gap-3">
        <NuxtImg
          placeholder
          format="avif,webp"
          quality="75"
          :src="seller?.image || '/logo/store-placeholder.png'"
          alt=""
          class="h-12 w-12 rounded-xl profile-image object-cover"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-gray-800 truncate">
            Toko Sumber Rejeki
          </p>
          <p class="text-xs text-gray-500 truncate">
            Desa Tiwulandu, Kec. Banjarharjo
          </p>
        </div>

        <!-- button pusat penjual -->
        <button
          class="flex self-center items-center text-white gap-3 bg-[rgb(var(--color-primary))]"
          style="justify-content: center;border-radius:20px;gap:5px;padding: 7px 10px;"
        >
          Pusat Penjual
        </button>
      </div>

      <!-- divider -->
      <div class="my-3 h-px bg-gray-100"></div>

      <!-- bottom actions -->
      <div class="grid grid-cols-3">
        <button
          v-for="item in actions"
          :key="item.id"
          class="relative flex flex-col items-center gap-1 py-1"
        >
          <Icon
            :icon="item.icon"
            class="h-6 w-6 text-gray-600"
          />

          <span class="text-[11px] text-gray-600">
            {{ item.label }}
          </span>

          <!-- badge -->
          <span
            v-if="item.badge"
            class="absolute right-8 top-0 rounded-full bg-red-500 px-1.5 text-[10px] text-white"
          >
            {{ item.badge }}
          </span>
        </button>
      </div>
    </div>
  </section>
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
