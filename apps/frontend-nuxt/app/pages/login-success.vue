<script setup>
definePageMeta({
  ssr: false,
  layout: false
})

const auth = useAuth()

onMounted(async () => {
  try {
    if (!auth.accessToken.value) {
      await auth.refresh()
      sessionStorage.setItem('justLoggedIn', 'true')
    }

    navigateTo('/', { replace: true })
  } catch (err) {
    navigateTo('/login', { replace: true })
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white">
    <!-- Spinner -->
    <div
      class="w-8 h-8 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mb-3"
    />

    <p class="text-sm text-gray-500">Sedang Proses Masuk...</p>
  </div>
</template>
