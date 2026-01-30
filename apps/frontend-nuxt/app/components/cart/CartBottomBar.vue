<template>
  <div class="fixed bottom-0 w-full bg-white border-t p-4 flex items-center justify-between">
    <div>
      <p class="text-xs text-gray-500">Total</p>
      <p class="font-semibold text-lg">
        IDR {{ format(total) }}
      </p>
    </div>

    <button
      class="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
    >
      Checkout
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  cart: Array,
})

const total = computed(() =>
  props.cart
    .filter(i => i.checked)
    .reduce((sum, i) => sum + i.price * i.qty, 0)
)

const format = (n) =>
  n.toLocaleString('id-ID')
</script>
