<script setup lang="ts">
definePageMeta({
  layout: false,
  ssr: false
})

onMounted(() => {
  const auth = useAuth()

  // pastiin 1 frame ke-paint
  requestAnimationFrame(() => {
    // 🔥 delay biar spinner keliatan
    setTimeout(() => {
      // redirect dulu
      navigateTo('/', { replace: true })

      // logout di belakang (fire & forget)
      auth.logout().catch(() => {})
    }, 1000) // ⏱️ atur 300–800ms sesuai selera
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white">
    <div
      class="w-8 h-8 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mb-3"
    />
    <p class="text-sm text-gray-500">Sedang Proses Keluar...</p>
  </div>
</template>
