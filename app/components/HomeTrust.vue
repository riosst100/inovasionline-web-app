<!-- components/HomeTrust.vue -->
<template>
  <section class="px-4 mt-8 grid grid-cols-2 gap-4 text-sm">
    <Trust icon="✅" text="Vendor Terverifikasi" />
    <Trust icon="🔒" text="Pembayaran Aman" />
    <Trust icon="⚡" text="Proses Cepat" />
    <Trust icon="📞" text="Support Responsif" />
  </section>
</template>

<script setup>
const Trust = defineComponent({
  props: ['icon', 'text'],
  template: `
    <div class="flex items-center gap-2 bg-white p-3 rounded-lg border">
      <span>{{ icon }}</span>
      <span>{{ text }}</span>
    </div>
  `
})
</script>
