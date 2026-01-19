<!-- components/HomeSearch.vue -->
<template>
  <section class="px-4 mt-4">
    <input
      type="text"
      placeholder="Cari layanan, event, atau produk…"
      class="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      @focus="goSearch"
    />
  </section>
</template>

<script setup>
const goSearch = () => {
  // nanti redirect ke halaman search
  console.log('go to search')
}
</script>
