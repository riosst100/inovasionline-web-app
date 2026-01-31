<template>
  <div class="mx-4 my-4 rounded-xl bg-gray-50 p-4" style="margin-bottom: 15px;">
    <div class="mb-1 text-xs text-gray-400">
      Iklan
    </div>

    <ins
      class="adsbygoogle block"
      style="display:block"
      data-ad-client="ca-pub-1196624064411452"
      data-ad-slot="2813516817"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script setup>
onMounted(() => {
  if (process.client && window.adsbygoogle?.push) {
    try {
      window.adsbygoogle.push({})
    } catch (e) {
      console.warn('Adsense error', e)
    }
  }
})
</script>
