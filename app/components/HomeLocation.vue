<!-- components/HomeLocation.vue -->
<template>
  <div
    class="px-4 py-2 text-sm text-gray-600 flex items-center gap-1"
    @click="changeLocation"
  >
    📍 Jakarta & Sekitarnya
  </div>
</template>

<script setup>
const changeLocation = () => {
  console.log('open location modal')
}
</script>
