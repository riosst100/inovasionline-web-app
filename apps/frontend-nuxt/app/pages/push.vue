<script setup lang="ts">

const { $getFcmToken, $onForegroundMessage } = useNuxtApp()

const token = ref<string | null>(null)
const sending = ref(false)

async function registerPush() {
  token.value = await $getFcmToken()

  if (!token.value) {
    alert('Gagal ambil token')
    return
  }

  await $fetch(`${config.public.backendUrl}/register-token`, {
    method: 'POST',
    body: {
      token: token.value
    }
  })

  alert('Token terdaftar')
}

async function sendPush() {
  sending.value = true

  try {
    await $fetch(`${config.public.backendUrl}/send-notification`, {
      method: 'POST',
      body: {
        title: 'Push dari UI',
        body: 'Notif dikirim dari halaman Nuxt'
      }
    })

    alert('Push terkirim')
  } catch (e) {
    console.error(e)
    alert('Gagal kirim push')
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  $onForegroundMessage((payload:any) => {

    console.log('FG payload:', payload)

    if (!payload?.data) return

    new Notification(payload.data.title, {
      body: payload.data.body
    })

  })
})


</script>

<template>
  <div style="padding:16px">
    <h1>Push TWA Nuxt</h1>

    <button @click="registerPush">
      Aktifkan Push
    </button>

    <br /><br />

    <button
      :disabled="sending"
      @click="sendPush"
    >
      Kirim Push
    </button>

    <p v-if="token" style="word-break:break-all">
      Token: {{ token }}
    </p>
  </div>
</template>
