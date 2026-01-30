<template>
  <div class="min-h-screen bg-gray-100 pb-24">
    <!-- Header -->
    <div class="bg-white px-4 py-3 flex items-center gap-3 shadow-sm">
      <button class="text-xl">←</button>
      <h1 class="font-semibold text-lg">My Cart</h1>
    </div>

    <!-- Cart Items -->
    <div class="mt-2 space-y-3">
      <CartItem
        v-for="item in cart"
        :key="item.id"
        :item="item"
        @toggle="item.checked = !item.checked"
        @updateQty="item.qty = $event"
      />
    </div>

    <CartBottomBar :cart="cart" />
  </div>
</template>

<script setup>
import CartItem from '@/components/cart/CartItem.vue'
import CartBottomBar from '@/components/cart/CartBottomBar.vue'

const cart = ref([
  {
    id: 1,
    name: 'Apple Watch Ultra 2 with Ocean Band',
    price: 15999000,
    image: 'https://via.placeholder.com/80',
    checked: true,
    qty: 1,
  },
  {
    id: 2,
    name: 'AirPods Pro 2nd generation USB-C',
    price: 3499000,
    oldPrice: 4299000,
    discount: '10% off',
    image: 'https://via.placeholder.com/80',
    checked: true,
    qty: 1,
  },
  {
    id: 3,
    name: 'Adicolor Classics Men’s Hoodie',
    price: 1500000,
    variant: 'Black, M',
    image: 'https://via.placeholder.com/80',
    checked: false,
    qty: 1,
  },
])
</script>
