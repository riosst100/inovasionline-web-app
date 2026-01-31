<script setup lang="ts">
definePageMeta({ ssr: false })

const auth = useAuth()
const error = ref('')

onMounted(async () => {
  const params = new URLSearchParams(window.location.search)
  console.log('params',params)
  const credential = params.get('credential')

  if (!credential) {
    error.value = 'Google login gagal'
    return
  }

  try {
    await auth.loginWithGoogle(credential)
    navigateTo('/', { replace: true })
  } catch (err) {
    console.error(err)
    error.value = 'Login Google gagal'
  }
})
</script>

<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <p v-else>Sedang login dengan Google…</p>
  </div>
</template>
