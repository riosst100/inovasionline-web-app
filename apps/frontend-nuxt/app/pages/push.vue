<script setup lang="ts">

const config = useRuntimeConfig()
const { $getFcmToken, $resetFcmToken, $onForegroundMessage } = useNuxtApp()


const token = ref<string | null>(null)
const sending = ref(false)
const notifPermission = ref<'default' | 'granted' | 'denied'>('default')

// simpan token ke backend
async function saveToken(fcmToken: string) {
  await $fetch(`${config.public.backendUrl}/register-token`, {
    method: 'POST',
    body: { token: fcmToken }
  })
}

// ambil token + simpan
async function registerPush(showAlert = true) {
    if (Notification.permission === 'denied') {
  alert(
    'Notifikasi diblokir.\nSilakan buka Settings aplikasi lalu aktifkan Notifications.'
  )
  return
}


  const t = await $getFcmToken()

  if (!t) {
    if (showAlert) {
      alert('Gagal ambil token / notifikasi belum diizinkan')
    }
    return
  }

  token.value = t
  await saveToken(t)

  notifPermission.value = Notification.permission

  if (showAlert) {
    alert('Token terdaftar')
  }
}

// kirim push dari UI
async function sendPush() {
  if (!token.value) {
    alert('Token belum ada')
    return
  }

  sending.value = true

  try {
    await $fetch(`${config.public.backendUrl}/send-notification`, {
      method: 'POST',
      body: {
        title: 'Push dari device ini',
        body: 'Notif hanya ke device ini',
        token: token.value
      }
    })

    alert('Push terkirim ke device ini')
  } finally {
    sending.value = false
  }
}


onMounted(async () => {

  notifPermission.value = Notification.permission

  // auto register kalau sudah pernah allow
  if (notifPermission.value === 'granted') {
    await registerPush(false)
  }

  // foreground message handler
  $onForegroundMessage((payload: any) => {

    console.log('FG payload:', payload)

    if (!payload?.data) return

    if (Notification.permission === 'granted') {
      new Notification(payload.data.title, {
        body: payload.data.body
      })
    }
  })
})

async function resetToken() {
  await $resetFcmToken()
  token.value = null
  alert('Token lokal di device dihapus. Reload lalu daftar ulang.')
}


</script>

<template>
  <div style="padding:16px">
    <h1>Push TWA Nuxt</h1>

    <button @click="resetToken">
  Reset token device ini
</button>


    <!-- tombol hanya muncul kalau belum granted -->
    <button
      v-if="notifPermission !== 'granted'"
      @click="registerPush(true)"
    >
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
