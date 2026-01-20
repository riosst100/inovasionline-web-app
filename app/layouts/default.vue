<template>
  <HomeHeader />
    <main class="bg-white pb-6">
      <NuxtPage />
    </main>
  <HomeFooter />
  <BottomNavbar />
</template>

<script setup>
  import BottomNavbar from '~/components/BottomNavbar.vue';
  import HomeHeader from '~/components/HomeHeader.vue';
</script>
