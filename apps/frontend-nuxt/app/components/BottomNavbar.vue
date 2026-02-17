<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50
           bg-white border-t border-gray-200"
  >
    <div class="max-w-md mx-auto flex justify-around py-2">
      <NuxtLink
        v-for="item in menus"
        :key="item.name"
        :to="item.to"
        prefetch
        class="flex flex-col items-center gap-1 text-xs"
        :class="isActive(item.to)
          ? 'text-primary'
          : 'text-gray-400'"
      >
        <Icon
          :icon="item.icon"
          class="w-6 h-6"
        />
        <span>{{ item.name }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const menus = [
  {
    name: 'Beranda',
    to: '/',
    icon: 'ph:house-fill',
  },
  {
    name: 'Postingan',
    to: '/feed',
    icon: 'material-symbols:rss-feed-rounded',
  },
  {
    name: 'Pesanan',
    to: '/notifikasi',
    icon: 'teenyicons:receipt-outline',
  },
  {
    name: 'Saya',
    to: '/profile',
    icon: 'ph:user',
  },
]

const isActive = (path) => route.path === path
</script>
