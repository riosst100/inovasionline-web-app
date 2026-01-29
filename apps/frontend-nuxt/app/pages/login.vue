<script setup lang="ts">
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
    // redirect otomatis dari watchEffect
  } catch {
    error.value = 'Login gagal'
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <h1>Login</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" />
    <button>Login</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>
