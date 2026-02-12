<script setup lang="ts">
definePageMeta({
  layout: false,
  ssr: false
})

const config = useRuntimeConfig()

onMounted(async () => {

  // flag login
  sessionStorage.setItem('justLoggedIn', 'true')

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

      alert('Access token berhasil di-refresh')
    } catch (e) {
      console.error('refresh token failed', e)
      alert('Gagal refresh token')
    }
  }

  const bindCode = localStorage.getItem('pendingBindCode')

  if (!bindCode) {
    alert('Tidak ada pending bind code')
  }

  if (accessToken && bindCode) {
    try {
      const res = await $fetch(
        `${config.public.backendUrl}/auth/push/attach`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: { code: bindCode }
        }
      )

      alert('Bind device berhasil')

      console.log('attach response:', res)

      localStorage.removeItem('pendingBindCode')
    } catch (e: any) {
      console.error('bind device failed', e)

      // kalau backend kirim message
      const msg =
        e?.data?.message ||
        e?.message ||
        'Bind device gagal'

      alert(msg)
    }
  }

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
