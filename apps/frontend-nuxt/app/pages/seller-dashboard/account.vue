<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'seller'
})

const products = [
  { id: 1, name: 'Produk A', price: 10000 },
  { id: 2, name: 'Produk B', price: 20000 }
]
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Products</h1>

    <table class="w-full bg-white rounded shadow">
      <thead>
        <tr class="border-b">
          <th class="p-3 text-left">Name</th>
          <th class="p-3 text-left">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id" class="border-b">
          <td class="p-3">{{ p.name }}</td>
          <td class="p-3">Rp {{ p.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
