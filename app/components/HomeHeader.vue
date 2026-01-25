<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <header class="bg-white sticky top-0 z-10 border-b">
    <div class="flex items-center justify-between px-4 h-[3.2rem]">
      <span class="font-bold text-indigo-600 text-lg">
        <img
            src="/logo/logo_text_v2.svg"
            alt="Inovasi Online Logo"
            class="w-auto"
            style="height:22px"
        />
    </span>
    <div class="flex items-center gap-[15px] text-gray-600">
        <a href="/cart" class="header-icon"><Icon icon="lineicons:cart-1" width="29" height="29" /></a>
        <a href="/messages" class="header-icon"><Icon icon="token:chat" width="29" height="29" /></a>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .header-icon {
    /* border: 1px solid #e5e7eb; */
    border-radius: 5px;
    padding: 5px;
  }
</style>