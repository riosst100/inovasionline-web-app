<script setup>
  import SellerBottomNavbar from '../components/seller-dashboard/SellerBottomNavbar.vue';
  import SellerNavbar from '../components/seller-dashboard/SellerNavbar.vue';
  import NotificationGate from '@/components/NotificationGate.vue'
</script>

<template>
  <div class="min-h-screen flex bg-gray-100">
    <div class="flex-1 flex flex-col">
      <SellerNavbar />
      <NotificationGate />

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>

      <SellerBottomNavbar />

    </div>
  </div>
</template>