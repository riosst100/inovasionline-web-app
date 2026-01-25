<script setup lang="ts">
import { onMounted } from 'vue'

const auth = useAuth()

const booting = useState('app-booting', () => true)
const pageLoading = useState('page-loading', () => false)

onMounted(async () => {
  if (!booting.value) return

  try {
    if (!auth.accessToken.value) {
      await auth.refresh()
    }
  } finally {
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
  <div v-if="booting" class="app-loading">
    <div class="spinner" />
    <p>Loading...</p>
  </div>
</template>
