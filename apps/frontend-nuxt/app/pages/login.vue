<script setup lang="ts">
definePageMeta({ ssr: false })

const config = useRuntimeConfig()
const error = ref('')
const googleBtn = ref<HTMLElement | null>(null)

/**
 * Google REDIRECT login
 */
onMounted(() => {
  // @ts-ignore
  google.accounts.id.initialize({
    client_id: config.public.googleClientId,

    // 🔑 PINDAH KE REDIRECT MODE
    ux_mode: 'redirect',

    // 🔑 GOOGLE AKAN REDIRECT KE URL INI
    login_uri: `${window.location.origin}/login/google`
  })

  // Tombol tetap sama
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

    <!-- container WAJIB kosong -->
    <div ref="googleBtn"></div>

    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>
