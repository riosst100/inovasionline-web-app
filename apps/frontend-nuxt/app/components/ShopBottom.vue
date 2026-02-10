<template>
  <!-- Floating Cart Bar -->
  <div
    class="fixed left-0 right-0 z-30 flex justify-center"
    style="bottom:30px"
  >
    <div
      class="flex items-center gap-3 rounded-xl bg-[rgb(var(--color-primary))] px-4 py-3 shadow-lg"
      style="justify-content: center;"
    >
      <!-- Icon -->
      <div class="relative">
        <Icon icon="lineicons:cart-1" class="text-white" width="25" />
        <!-- <a href="/cart" class="header-icon"><Icon icon="lineicons:cart-1" width="29" height="29" /></a> -->

        <!-- badge jumlah -->
        <span
          v-if="cartCount > 0"
          class="absolute -top-2 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white"
        >
          {{ cartCount }}
        </span>
      </div>

      <!-- Text -->
      <div class="text-sm font-semibold text-white">
        Keranjang Belanja
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { computed } from 'vue'

  // contoh dummy cart
  const cartItems = ref([
    { id: 1, name: 'Nasi Goreng', qty: 2 },
    { id: 2, name: 'Es Teh', qty: 1 }
  ])

  const cartCount = computed(() => {
    return cartItems.value.reduce((t, i) => t + i.qty, 0)
  })
</script>
