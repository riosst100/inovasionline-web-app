<script setup lang="ts">

const auth = useAuth()

watchEffect(() => {
  if (!auth.accessToken.value) {
    navigateTo('/login', { replace: true })
  }
})
</script>

<template>
  HELLO
</template>
