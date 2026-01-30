<script setup lang="ts">
definePageMeta({
  ssr: false
})

const auth = useAuth()

watchEffect(() => {
  if (auth.accessToken.value) {
    navigateTo('/', { replace: true })
  }
})

const email = ref('')
const password = ref('')
const error = ref('')

const submit = async () => {
  try {
    await auth.login(email.value, password.value)
  } catch {
    error.value = 'Login gagal'
  }
}

const config = useRuntimeConfig()

const loginGoogle = () => {
  window.location.href = `${config.public.backendUrl}/auth/google`
}
</script>

<template>
  <form @submit.prevent="submit">
    <h1>Login</h1>
    <!-- <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" />
    <button>Login</button> -->
    <!-- <p v-if="error">{{ error }}</p> -->

    <button @click="loginGoogle">
      Login dengan Google
    </button>
  </form>
</template>
