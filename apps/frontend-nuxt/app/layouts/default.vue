<script setup>
  import BottomNavbar from '~/components/BottomNavbar.vue';
  import HomeHeader from '~/components/HomeHeader.vue';
  import { SpeedInsights } from '@vercel/speed-insights/vue';
  import { Analytics } from '@vercel/analytics/nuxt'

  useHead({
    script: [
      {
        src: 'https://accounts.google.com/gsi/client',
        async: true,
        defer: true
      }
    ]
  })
</script>

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