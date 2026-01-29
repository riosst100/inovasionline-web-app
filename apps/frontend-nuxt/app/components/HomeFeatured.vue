<!-- components/HomeFeatured.vue -->
<template>
  <section class="mt-6">
    <div class="px-4 mb-3 flex justify-between items-center">
      <h3 class="font-semibold">Event Terdekat</h3>
      <span class="text-sm text-indigo-600">Lihat Semua</span>
    </div>

    <div class="flex gap-4 overflow-x-auto px-4">
      <Card v-for="i in 4" :key="i" />
    </div>
  </section>
</template>

<script setup>
const Card = defineComponent({
  template: `
    <div class="min-w-[160px] bg-white rounded-xl border overflow-hidden">
      <div class="h-24 bg-gray-200"></div>
      <div class="p-2 text-sm">
        <p class="font-medium">Konser XYZ</p>
        <p class="text-xs text-gray-500">20 Feb 2026</p>
        <p class="mt-1 font-semibold text-indigo-600">Rp 150.000</p>
      </div>
    </div>
  `
})
</script>
