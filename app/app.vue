<script setup lang="ts">
import { ref, onMounted } from 'vue'

const auth = useAuth()

// LOCAL loading state (BUKAN global auth state)
const booting = ref(true)

onMounted(async () => {
  /**
   * Silent refresh saat app pertama kali load
   * - Tidak blok NuxtPage
   * - Tidak bikin infinite loading
   */
  try {
    if (!auth.accessToken.value) {
      await auth.refresh()
    }
  } catch {
    // guest / refresh token invalid
  } finally {
    booting.value = false
  }
})
</script>

<template>
  <!-- PAGE TREE (WAJIB SELALU ADA) -->
  <NuxtPage />

  <!-- LOADING OVERLAY -->
  <div v-if="booting" class="app-loading">
    <div class="spinner" />
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.app-loading {
  position: fixed;
  inset: 0;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 4px solid #e5e7eb;
  border-top-color: #111827;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
