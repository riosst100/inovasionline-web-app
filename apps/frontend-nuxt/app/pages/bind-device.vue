<script setup>
const route = useRoute()

onMounted(() => {
  const code = route.query.code

  if (code) {
    localStorage.setItem("pendingBindCode", code)
  }

  navigateTo("/")
})
</script>

<template>
  <div>Menghubungkan device…</div>
</template>
