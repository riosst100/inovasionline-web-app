<script setup>
  import ShopBottom from '~/components/ShopBottom.vue';
  import SubPageHeader from '~/components/SubPageHeader.vue';
  import { SpeedInsights } from '@vercel/speed-insights/vue';
  import { Analytics } from '@vercel/analytics/nuxt'

  // useHead({
  //   script: [
  //     {
  //       src: 'https://accounts.google.com/gsi/client',
  //       async: true,
  //       defer: true
  //     }
  //   ]
  // })
</script>

<template>
  <SubPageHeader />
    <main class="bg-white pb-6">
      <NuxtPage />
    </main>
  <HomeFooter />
  <ShopBottom />
  <SpeedInsights />
  <Analytics />
</template>