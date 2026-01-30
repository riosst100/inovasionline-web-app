<template>
  <div class="bg-white mt-3 p-4">
    <div class="flex justify-between mb-3">
      <h3 class="font-semibold">{{ title }}</h3>
      <span class="text-sm text-orange-500 cursor-pointer">
        Lihat Semua
      </span>
    </div>

    <div class="grid grid-cols-4 gap-3 text-center">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="relative"
      >
        <div class="text-2xl">{{ item.icon || '👜' }}</div>

        <span
          v-if="item.badge"
          class="absolute -top-1 right-3 bg-red-500 text-white text-xs px-2 rounded-full"
        >
          {{ item.badge }}
        </span>

        <p class="text-sm mt-1">{{ item.label }}</p>
        <p v-if="item.value" class="text-xs text-orange-500">
          {{ item.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  items: Array,
})
</script>
