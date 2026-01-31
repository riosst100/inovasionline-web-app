<script setup>
definePageMeta({ ssr: false })

const auth = useAuth()

onMounted(async () => {
  try {
    // kalau sudah punya token → jangan anggap login baru
    if (!auth.accessToken.value) {
      await auth.refresh()
      sessionStorage.setItem('justLoggedIn', 'true') // 🔥 login baru
    }

    navigateTo('/', { replace: true })
  } catch (err) {
    navigateTo('/login', { replace: true })
  }
})
</script>

<template>
  <p class="text-sm text-gray-500">Logging you in...</p>
</template>
