<template>
  <!-- HEADER -->
  <header class="bg-white sticky top-0 z-10 border-b">
    <div class="flex items-center justify-between px-4 h-[3.2rem]">
      <div class="flex items-center gap-[15px] text-gray-600">
        <div
          @click="toggleSidebar"
          class="header-icon text-2xl md:hidden"
        >
          <Icon icon="glyphs:bars-bold" width="29" height="29" />
        </div>

        <NuxtLink to="/seller-dashboard">
          <h1 class="font-semibold">Pusat Penjual</h1>
        </NuxtLink>
      </div>

      <div class="flex items-center gap-[15px] text-gray-600">
        <a href="/cart" class="header-icon">
          <Icon icon="lineicons:cart-1" width="29" height="29" />
        </a>
        <a href="/messages" class="header-icon">
          <Icon icon="token:chat" width="29" height="29" />
        </a>
      </div>
    </div>
  </header>

  <div class="min-h-screen bg-gray-100 relative overflow-hidden">
    <!-- OVERLAY -->
    <div
      v-show="sidebarVisible"
      class="fixed inset-0 bg-black z-30 md:hidden transition-opacity duration-300"
      :style="{ opacity: overlayOpacity }"
      @click="closeSidebar"
    />

    <!-- SIDEBAR -->
    <aside
      ref="sidebarRef"
      class="
        fixed top-0 left-0 z-40
        h-full w-64 bg-white shadow
        transform
        md:translate-x-0
      "
      :class="dragging ? 'transition-none' : 'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]'"
      :style="{ transform: `translateX(${translateX}px)` }"
    >
      <div class="p-4 font-bold text-xl flex justify-between items-center">
        <span>Seller Panel</span>
        <button class="md:hidden text-2xl" @click="closeSidebar">✕</button>
      </div>

      <nav class="p-4 space-y-2">
        <NuxtLink to="/seller" class="block p-2 rounded hover:bg-gray-100" @click="closeSidebar">
          Dashboard
        </NuxtLink>
        <NuxtLink to="/seller/products" class="block p-2 rounded hover:bg-gray-100" @click="closeSidebar">
          Products
        </NuxtLink>
        <NuxtLink to="/seller/orders" class="block p-2 rounded hover:bg-gray-100" @click="closeSidebar">
          Orders
        </NuxtLink>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useSwipe } from '@vueuse/core'
import { ref, computed } from 'vue'

const SIDEBAR_WIDTH = 256

const sidebarOpen = ref(false)
const dragging = ref(false)
const dragX = ref(0)

const sidebarVisible = computed(
  () => sidebarOpen.value || dragging.value
)

const translateX = computed(() => {
  if (dragging.value) {
    return Math.min(
      0,
      Math.max(-SIDEBAR_WIDTH, -SIDEBAR_WIDTH + dragX.value)
    )
  }
  return sidebarOpen.value ? 0 : -SIDEBAR_WIDTH
})

const overlayOpacity = computed(() => {
  const progress = 1 - Math.abs(translateX.value) / SIDEBAR_WIDTH
  return Math.min(0.4, Math.max(0, progress * 0.4))
})

const openSidebar = () => (sidebarOpen.value = true)
const closeSidebar = () => (sidebarOpen.value = false)
const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value)

useSwipe(document, {
  threshold: 0,
  onSwipeStart() {
    dragging.value = true
    dragX.value = 0
  },
  onSwipe(_, direction, length) {
    if (direction === 'right') dragX.value = length
    if (direction === 'left') dragX.value = -length
  },
  onSwipeEnd() {
    dragging.value = false
    sidebarOpen.value = dragX.value > SIDEBAR_WIDTH / 2
    dragX.value = 0
  }
})
</script>

<style scoped>
.header-icon{
  border-radius: 5px;
  padding: 5px;
}
</style>
