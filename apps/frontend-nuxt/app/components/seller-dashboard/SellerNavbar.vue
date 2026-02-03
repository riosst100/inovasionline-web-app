<template>
  <!-- HEADER -->
  <header class="bg-white sticky top-0 z-20 border-b">
    <div class="flex items-center justify-between px-4 h-[3.2rem]">
      <div class="flex items-center gap-[15px] text-gray-600">
        <div @click="toggleSidebar" class="header-icon text-2xl md:hidden"><Icon icon="glyphs:bars-bold" width="29" height="29" /></div>
        <NuxtLink
          to="/seller-dashboard"
        >
          <h1 class="font-semibold">Pusat Penjual</h1>
        </NuxtLink>
      </div>
      <div class="flex items-center gap-[15px] text-gray-600">
        <a href="/seller-dashboard/notifications" class="header-icon"><Icon icon="ph:bell" width="29" height="29" /></a>
        <a href="/seller-dashboard/messages" class="header-icon"><Icon icon="token:chat" width="29" height="29" /></a>
      </div>
    </div>
  </header>

  <div
    class="relative min-h-screen bg-gray-100 overflow-hidden"
    @touchstart.passive="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- OVERLAY -->
    <div
      v-show="sidebarVisible"
      class="fixed inset-0 bg-black z-10 md:hidden"
      :style="{ opacity: overlayOpacity }"
      @click="closeSidebar"
    />

    <!-- SIDEBAR -->
    <aside
      class="fixed top-0 left-0 z-20 h-full w-64 bg-white shadow"
      :class="dragging ? 'transition-none' : 'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]'"
      :style="{ transform: `translateX(${translateX}px)` }"
    >
      <div class="p-4 font-bold text-xl flex justify-between">
        Seller Panel
        <button class="md:hidden" @click="closeSidebar">✕</button>
      </div>
    </aside>

    <!-- CONTENT -->
    <div class="p-6">
      <p>Konten halaman seller…</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'

const WIDTH = 256

const sidebarOpen = ref(false)
const dragging = ref(false)

const startX = ref(0)
const startTranslate = ref(0)
const currentTranslate = ref(-WIDTH)

const sidebarVisible = computed(
  () => sidebarOpen.value || dragging.value
)

// posisi sidebar final
const translateX = computed(() => currentTranslate.value)

// overlay ikut progress
const overlayOpacity = computed(() => {
  const progress = 1 - Math.abs(translateX.value) / WIDTH
  return Math.min(0.4, Math.max(0, progress * 0.4))
})

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val))
}

function onTouchStart(e) {
  // hanya edge swipe atau sidebar sudah open
  if (!sidebarOpen.value && e.touches[0].clientX > 30) return

  dragging.value = true
  startX.value = e.touches[0].clientX
  startTranslate.value = currentTranslate.value
}

function onTouchMove(e) {
  if (!dragging.value) return

  const delta = e.touches[0].clientX - startX.value
  currentTranslate.value = clamp(
    startTranslate.value + delta,
    -WIDTH,
    0
  )
}

function onTouchEnd() {
  if (!dragging.value) return
  dragging.value = false

  const shouldOpen = currentTranslate.value > -WIDTH / 2

  sidebarOpen.value = shouldOpen
  currentTranslate.value = shouldOpen ? 0 : -WIDTH
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
  currentTranslate.value = sidebarOpen.value ? 0 : -WIDTH
}

function closeSidebar() {
  sidebarOpen.value = false
  currentTranslate.value = -WIDTH
}
</script>

<style scoped>
.header-icon {
  padding: 5px;
  border-radius: 5px;
}
</style>
