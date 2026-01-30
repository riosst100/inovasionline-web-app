<script setup>
import { onMounted } from "vue"

const route = useRoute()

onMounted(() => {
  const token = route.query.token

  if (token) {
    localStorage.setItem("token", token)
    navigateTo("/")
  }
})
</script>
<template>
  <p>Logging you in...</p>
</template>