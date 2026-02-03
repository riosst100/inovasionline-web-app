<template>
  <header class="bg-white sticky top-0 z-10 border-b">
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
        <a href="/cart" class="header-icon"><Icon icon="lineicons:cart-1" width="29" height="29" /></a>
        <a href="/messages" class="header-icon"><Icon icon="token:chat" width="29" height="29" /></a>
      </div>
    </div>
  </header>
  <div class="min-h-screen flex bg-gray-100">

    <!-- Overlay -->
    <div
      v-if="sidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300"
    />

    <!-- Sidebar -->
    <aside
      ref="sidebarRef"
      class="
        fixed md:static
        top-0 left-0 z-40
        h-full w-64 bg-white shadow
        transform
        transition-transform duration-300
        ease-out
      "
      :class="[
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0'
      ]"
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
  import { ref } from 'vue'

  const sidebarOpen = ref(false)
  const sidebarRef = ref(null)

  const openSidebar = () => (sidebarOpen.value = true)
  const closeSidebar = () => (sidebarOpen.value = false)
  const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value)

  // Swipe on whole screen
  useSwipe(document, {
    threshold: 80,
    onSwipeEnd(e, direction) {
      if (direction === 'right') openSidebar()
      if (direction === 'left') closeSidebar()
    },
  })
</script>

<style scoped>
  .header-icon {
    /* border: 1px solid #e5e7eb; */
    border-radius: 5px;
    padding: 5px;
  }
</style>