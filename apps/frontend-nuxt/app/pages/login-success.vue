<script setup lang="ts">
definePageMeta({
  layout: false,
  ssr: false
})

const config = useRuntimeConfig()
const auth = useAuth()

onMounted(async () => {

  // flag login (tetap)
  sessionStorage.setItem('justLoggedIn', 'true')

  // ===========================
  // ambil access token dari useAuth
  // ===========================

  if (auth.authLoading.value) {
    await auth.refresh()
  }

  const accessToken = auth.accessToken.value

  if (!accessToken) {
    alert('Access token tidak tersedia')
  }

  // ===========================
  // bind device kalau ada pendingBindCode
  // ===========================

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

      const msg =
        e?.data?.message ||
        e?.message ||
        'Bind device gagal'

      alert(msg)
    }
  }

  // ===========================
  // redirect tetap
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