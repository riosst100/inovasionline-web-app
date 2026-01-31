<script setup lang="ts">
definePageMeta({ ssr: false })

const config = useRuntimeConfig()
const googleBtn = ref<HTMLElement | null>(null)
const error = ref('')

onMounted(() => {
  // @ts-ignore
  google.accounts.id.initialize({
    client_id: config.public.googleClientId,
    ux_mode: 'redirect',
    login_uri: `${config.public.backendUrl}/auth/google/callback`
  })

  // @ts-ignore
  google.accounts.id.renderButton(googleBtn.value, {
    theme: 'outline',
    size: 'large',
    width: 280
  })
})
</script>

<template>
  <div>
    <!-- LOGIN UI cuma muncul di /login -->
    <div v-if="$route.path === '/login'">
      <h1>Login</h1>
      <div ref="googleBtn"></div>
      <p v-if="error" style="color:red">{{ error }}</p>
    </div>

    <!-- 🔑 WAJIB: TEMPAT RENDER CHILD ROUTE -->
    <NuxtPage />
  </div>
</template>
