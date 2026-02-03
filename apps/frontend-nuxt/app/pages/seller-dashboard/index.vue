<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'seller'
})

const stats = [
  { label: 'Total Produk', value: 12 },
  { label: 'Order Hari Ini', value: 5 },
  { label: 'Pendapatan', value: 'Rp 1.250.000' }
]
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white p-4 rounded shadow"
      >
        <p class="text-gray-500">{{ stat.label }}</p>
        <p class="text-xl font-semibold">{{ stat.value }}</p>
      </div>
    </div>
  </div>
</template>
