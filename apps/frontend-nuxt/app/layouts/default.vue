<template>
  <HomeHeader />
    <main class="bg-white pb-6">
      <NuxtPage />
    </main>
  <HomeFooter />
  <BottomNavbar />
  <SpeedInsights />
  <Analytics />
</template>

<script setup>
  import BottomNavbar from '~/components/BottomNavbar.vue';
  import HomeHeader from '~/components/HomeHeader.vue';
  import { SpeedInsights } from '@vercel/speed-insights/vue';
  import { Analytics } from '@vercel/analytics/nuxt'
</script>
