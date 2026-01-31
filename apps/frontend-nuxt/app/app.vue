<script setup lang="ts">
const auth = useAuth()

const booting = useState('app-booting', () => true)
const pageLoading = useState('page-loading', () => false)

onMounted(async () => {
  if (!booting.value) return

  try {
    await auth.refresh()
  } finally {
    auth.authLoading.value = false // 🔥 PENTING
    booting.value = false
  }
})
</script>

<template>
  <NuxtPwaManifest />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <!-- top loading bar -->
  <div v-if="pageLoading" class="top-loading-bar" />

  <!-- booting overlay -->
  <!-- <div v-if="booting" class="app-loading">
    <div class="spinner" />
    <p>Loading...</p>
  </div> -->
</template>
