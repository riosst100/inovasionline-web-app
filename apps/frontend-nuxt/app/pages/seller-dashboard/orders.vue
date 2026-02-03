<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'seller'
})

const orders = [
  { id: 1, buyer: 'Andi', total: 50000 },
  { id: 2, buyer: 'Budi', total: 75000 }
]
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Orders</h1>

    <ul class="space-y-3">
      <li
        v-for="o in orders"
        :key="o.id"
        class="bg-white p-4 rounded shadow"
      >
        <p class="font-semibold">Order #{{ o.id }}</p>
        <p>Pembeli: {{ o.buyer }}</p>
        <p>Total: Rp {{ o.total }}</p>
      </li>
    </ul>
  </div>
</template>
