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

onMounted(() => {
  window.handleCredential = async (response: any) => {
    await $fetch('/api/auth/google', {
      method: 'POST',
      body: { credential: response.credential }
    })
  }
})
</script>

<template>
  <form @submit.prevent="submit">
    <h1>Login</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" />
    <button>Login</button>
    <p v-if="error">{{ error }}</p>
    <div
      id="g_id_onload"
      data-client_id="418700195085-onl0on3kj8g5f3gk3f2mq888b2c0b0mm.apps.googleusercontent.com"
      data-callback="handleCredential"
    ></div>

    <div class="g_id_signin"></div>
  </form>
</template>
