<script setup>
import { onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

onMounted(async () => {

  const token = route.query.token

  if (!token) {
    return router.replace("/login")
  }

  try {

    await $fetch(`${config.public.backendUrl}/auth/mobile-bridge`, {
      method: "POST",
      body: { token },
      credentials: "include" // 🔥 penting untuk cookie
    })

    // redirect setelah cookie diset
    router.replace("/login-success")

  } catch (err) {
    router.replace("/login")
  }

})
</script>

<template>
  <div style="display:flex;justify-content:center;align-items:center;height:100vh;">
    <p>Sedang Masuk...</p>
  </div>
</template>
