<template>
  <div class="mt-3 space-y-2">
    <div
      v-for="c in comments"
      :key="c.id"
      class="text-sm bg-gray-100 px-3 py-2 rounded-lg"
    >
      <span class="font-semibold">{{ c.user }}</span>
      <span class="ml-1 text-gray-700">{{ c.text }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  comments: Array,
})
</script>
