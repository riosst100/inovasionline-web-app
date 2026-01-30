<script setup lang="ts">
const auth = useAuth()

watchEffect(() => {
  // ⏳ tunggu auth siap
  if (auth.authLoading.value) return

  // ❌ belum login
  if (!auth.accessToken.value) {
    navigateTo('/login', { replace: true })
  }
})
</script>

<template>
  <div>
    HELLO
  </div>
</template>
