<script setup>
definePageMeta({ ssr: false })

const auth = useAuth()

onMounted(async () => {
  try {
    // 🔑 ambil access token dari refresh cookie
    await auth.refresh()

    // login sukses
    navigateTo("/", { replace: true })
  } catch (err) {
    // refresh gagal → balik ke login
    navigateTo("/login", { replace: true })
  }
})
</script>

<template>
  <p>Logging you in...</p>
</template>
