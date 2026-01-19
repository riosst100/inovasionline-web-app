<script setup>
import { Icon } from '@iconify/vue'

const changeLocation = () => {
  console.log('open location modal')
}
</script>
<template>
  <div
    class="px-4 py-2 text-sm text-gray-600 flex items-center gap-1"
    @click="changeLocation"
  >
    <Icon icon="material-symbols:home-pin-outline-rounded" width="24" height="24" /> Jakarta & Sekitarnya
  </div>
</template>
