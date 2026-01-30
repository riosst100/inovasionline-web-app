<template>
  <div class="bg-white p-4 flex gap-3">
    <input type="checkbox" v-model="item.checked" />

    <img :src="item.image" class="w-20 h-20 rounded-lg object-cover" />

    <div class="flex-1">
      <p class="font-medium text-sm">{{ item.name }}</p>

      <p v-if="item.variant" class="text-xs text-gray-500 mt-1">
        {{ item.variant }}
      </p>

      <div class="mt-1 flex items-center gap-2">
        <span class="font-semibold">
          IDR {{ format(item.price) }}
        </span>

        <span
          v-if="item.oldPrice"
          class="line-through text-xs text-gray-400"
        >
          IDR {{ format(item.oldPrice) }}
        </span>

        <span
          v-if="item.discount"
          class="text-xs text-red-500"
        >
          {{ item.discount }}
        </span>
      </div>

      <!-- Quantity -->
      <div class="mt-3 flex items-center gap-3">
        <button
          class="border px-2 rounded"
          @click="updateQty(item.qty - 1)"
        >−</button>

        <span>{{ item.qty }}</span>

        <button
          class="border px-2 rounded"
          @click="updateQty(item.qty + 1)"
        >+</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
})

const emit = defineEmits(['updateQty'])

const updateQty = (value) => {
  if (value < 1) return
  emit('updateQty', value)
}

const format = (n) =>
  n.toLocaleString('id-ID')
</script>
