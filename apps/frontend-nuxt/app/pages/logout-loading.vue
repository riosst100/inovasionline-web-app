<script setup lang="ts">
definePageMeta({
  layout: false,
  ssr: false // 🔥 INI KUNCINYA
})

onMounted(() => {
  const auth = useAuth()

  // spinner udah tampil di DOM
  requestAnimationFrame(() => {
    // redirect langsung
    navigateTo('/', { replace: true })

    // request di belakang
    auth.logout().catch(() => {})
  })
})
</script>


<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white">
    <div
      class="w-8 h-8 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mb-3"
    />
    <p class="text-sm text-gray-500">Sedang logout...</p>
  </div>
</template>
