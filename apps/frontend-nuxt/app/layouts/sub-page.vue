<script setup>
  import SubPageHeader from '@/components/SubPageHeader.vue';
  import BottomNavbar from '@/components/BottomNavbar.vue';
  import { SpeedInsights } from '@vercel/speed-insights/vue';
  import { Analytics } from '@vercel/analytics/nuxt'
</script>
<template>
  <SubPageHeader />
    <main class="bg-white pb-6">
      <NuxtPage />
    </main>
  <HomeFooter />
  <BottomNavbar />
  <SpeedInsights />
  <Analytics />
</template>