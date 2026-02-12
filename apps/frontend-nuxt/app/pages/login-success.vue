<script setup lang="ts">
definePageMeta({
  layout: false,
  ssr: false
})

const config = useRuntimeConfig()

onMounted(async () => {

  // flag login
  sessionStorage.setItem('justLoggedIn', 'true')

  // ===========================
  // 🔔 bind FCM device (kalau ada)
  // ===========================

  let accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    try {
      const r = await $fetch<{ accessToken: string }>(
        `${config.public.backendUrl}/auth/refresh`,
        {
          method: 'POST',
          credentials: 'include'
        }
      )

      accessToken = r.accessToken
      localStorage.setItem('accessToken', accessToken)
    } catch (e) {
      // kalau gagal ambil token, tetap lanjut redirect
      console.error('refresh token failed')
    }
  }

  const bindCode = localStorage.getItem('pendingBindCode')

  if (accessToken && bindCode) {
    try {
      await $fetch(`${config.public.backendUrl}/auth/push/attach`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: { code: bindCode }
      })

      localStorage.removeItem('pendingBindCode')
    } catch (e) {
      console.error('bind device failed', e)
    }
  }

  // ===========================
  // UI flow kamu tetap
  // ===========================

  requestAnimationFrame(() => {
    setTimeout(() => {
      navigateTo('/', { replace: true })
    }, 1000)
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white">
    <div
      class="w-8 h-8 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mb-3"
    />
    <p class="text-sm text-gray-500">Sedang Proses Masuk...</p>
  </div>
</template>
