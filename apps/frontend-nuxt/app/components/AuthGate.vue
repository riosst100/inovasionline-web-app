<script setup lang="ts">
const auth = useAuth()

watchEffect(() => {
  // auth sudah selesai dicek
  if (!auth.authLoading.value && auth.accessToken.value) {
    navigateTo('/', { replace: true })
  }
})
</script>

<template>
  <slot />
</template>
