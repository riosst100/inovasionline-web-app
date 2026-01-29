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
    name: 'Home',
    to: '/',
    icon: 'ph:house-fill',
  },
  {
    name: 'Wishlist',
    to: '/wishlist',
    icon: 'ph:heart',
  },
  {
    name: 'Transaction',
    to: '/transaction',
    icon: 'ph:receipt',
  },
  {
    name: 'Profile',
    to: '/profile',
    icon: 'ph:user',
  },
]

const isActive = (path) => route.path === path
</script>
