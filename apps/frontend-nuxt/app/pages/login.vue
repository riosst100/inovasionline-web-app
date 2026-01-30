<script setup lang="ts">
definePageMeta({ ssr: false })

const auth = useAuth()
const config = useRuntimeConfig()
const error = ref('')
const googleBtn = ref<HTMLElement | null>(null)

watchEffect(() => {
  if (auth.accessToken.value) {
    navigateTo('/', { replace: true })
  }
})

onMounted(() => {
  // @ts-ignore
  google.accounts.id.initialize({
    client_id: config.public.googleClientId,
    callback: async (response: any) => {
      try {
        await auth.loginWithGoogle(response.credential)
      } catch (e) {
        console.error(e)
        error.value = 'Login Google gagal'
      }
    }
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
    <h1>Login</h1>

    <!-- HARUS div kosong -->
    <div ref="googleBtn"></div>

    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>
