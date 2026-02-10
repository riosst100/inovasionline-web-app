<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <header class="header top-0 z-20">
    <div class="flex items-center justify-between px-4 h-[3rem]">
        <!-- <div class="bg-black/40 rounded-full flex items-center justify-center" style="height:40px;width:40px;">
            <Icon icon="line-md:arrow-left" width="25" height="25" class="text-white" />
        </div> -->
      <div class="flex items-center gap-[15px] text-gray-600">
        <div @click="toggleSidebar" class="header-icon text-2xl md:hidden"><Icon icon="line-md:arrow-left" width="25" height="25" /></div>
      </div>
      <!-- <div class="flex items-center gap-[15px] text-gray-600">
        <a href="/seller-dashboard/notifications" class="header-icon"><Icon icon="ph:bell" width="29" height="29" /></a>
        <a href="/seller-dashboard/messages" class="header-icon"><Icon icon="token:chat" width="29" height="29" /></a>
      </div> -->
    </div>
  </header>
</template>

<style scoped>
.header {
        position: fixed;
    background: #00000054;
    width: 100%;
}
  .header-icon {
    /* border: 1px solid #e5e7eb; */
    border-radius: 5px;
    /* padding: px; */
    color:white;
  }
</style>