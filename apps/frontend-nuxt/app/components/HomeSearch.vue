<!-- components/HomeSearch.vue -->
<template>
  <section class="px-4 pt-[15px] mb-2">
    <div class="relative">
      <!-- Icon prefix -->
      <Icon
        icon="material-symbols:search-rounded"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        width="20"
        height="20"
      />

      <!-- Input -->
      <input
        type="text"
        placeholder="Cari layanan, event, atau produk…"
        class="search-input w-full border pl-10 pr-4 text-sm
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
        @focus="goSearch"
      />
    </div>
  </section>
</template>
<style scoped>
  .search-input {
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 8px;
  }
</style>
<script setup>
import { Icon } from '@iconify/vue'

const goSearch = () => {
  console.log('go to search')
}
</script>
