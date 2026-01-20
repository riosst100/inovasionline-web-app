<script setup>
import { Icon } from '@iconify/vue'

const changeLocation = () => {
  console.log('open location modal')
}
</script>
<template>
  <div
    class="px-4 py-2 text-gray-600 flex items-center gap-1"
    @click="changeLocation"
  >
    <img
    src="/icon/location.webp"
    style="width:16px"
    /><span class="delivery-to">Deliv ke</span> <span class="pin-address">Desa Tiwulandu, Kec. Banjarharjo</span>
  </div>
</template>
<style scoped>
  .delivery-to {
    color:grey;
  }
  .pin-address {
    padding-left: 2px;
    padding-right: 2px;
    font-weight: 500;
  }
</style>
