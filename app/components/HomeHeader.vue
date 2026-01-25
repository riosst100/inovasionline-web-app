<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <header class="bg-white sticky top-0 z-10 border-b">
    <div class="flex items-center justify-between px-4 h-14">
      <span class="font-bold text-indigo-600 text-lg">
        <img
            src="/logo/logo_text_new.svg"
            alt="Inovasi Online Logo"
            class="w-auto"
            style="height:20px"
        />
    </span>
    <div class="flex items-center gap-[10px] text-gray-600">
        <a href="/cart" class="header-icon"><Icon icon="lineicons:cart-1" width="24" height="24" /></a>
        <a href="/messages" class="header-icon"><Icon icon="token:chat" width="24" height="24" /></a>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .header-icon {
    border: 1px solid #e5e7eb;
    border-radius: 5px;
    padding: 5px;
  }
</style>