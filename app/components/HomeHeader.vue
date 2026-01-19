<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <header class="bg-white sticky top-0 z-10 border-b">
    <div class="flex items-center justify-between px-4 h-14">
      <span class="font-bold text-indigo-600 text-lg"><img
        src="/logo/logo_text.svg"
        alt="EventHub"
        class="w-auto"
        style="height:25px"
      /></span>

      <div class="flex items-center gap-4 text-gray-600">
        <span><Icon icon="material-symbols:search-rounded" width="24" height="24" /></span>
        <span><Icon icon="material-symbols:shopping-cart-outline-rounded" width="24" height="24" /></span>
      </div>
    </div>
  </header>
</template>
