<script setup lang="ts">
const auth = useAuth()

watchEffect(() => {
  if (auth.accessToken.value) {
    navigateTo('/', { replace: true })
  }
})
const name = ref('')
const email = ref('')
const password = ref('')
const success = ref(false)

const submit = async () => {
  await auth.register(name.value, email.value, password.value)
  success.value = true
}
</script>

<template>
  <form @submit.prevent="submit">
    <h1>Register</h1>
    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button>Register</button>
    <p v-if="success">Register sukses, silakan login</p>
  </form>
</template>
