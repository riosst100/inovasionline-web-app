<template>
  <div
    class="fixed left-0 right-0 z-30 flex justify-center"
    style="bottom:30px"
  >
    <div
      class="flex items-center gap-3 bg-[rgb(var(--color-primary))] px-6 py-3 shadow-lg"
      style="justify-content: center;border-radius:30px;gap:8px"
    >
      <div class="relative">
        <Icon icon="material-symbols-light:order-approve-rounded" class="text-white" width="28" />
      </div>
      <div class="text-sm text-white" style="font-weight: 500;">
        <!-- Buat Pesanan ({{ cartCount }} produk) -->
         Silahkan tambahkan pesanan
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { computed } from 'vue'

  const cartItems = ref([
    { id: 1, name: 'Nasi Goreng', qty: 2 },
    { id: 2, name: 'Es Teh', qty: 1 }
  ])

  const cartCount = computed(() => {
    return cartItems.value.reduce((t, i) => t + i.qty, 0)
  })
</script>
