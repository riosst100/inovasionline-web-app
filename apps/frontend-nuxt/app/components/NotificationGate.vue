<script setup lang="ts">

const config = useRuntimeConfig()
const { $getFcmToken } = useNuxtApp()

const show = ref(false)
const loading = ref(false)
const permission = ref<'default' | 'granted' | 'denied'>('default')

async function saveToken(token: string) {
  await $fetch(`${config.public.backendUrl}/register-token`, {
    method: 'POST',
    body: { token }
  })
}

async function enableNotification() {

  if (Notification.permission === 'denied') {
    alert(
      'Notifikasi diblokir.\n\nAgar seller bisa menerima notifikasi pesanan & chat, silakan buka:\n\nSettings aplikasi / browser → Notifications → Allow\n\nLalu buka ulang aplikasi.'
    )
    return
  }

  loading.value = true

  try {
    const token = await $getFcmToken()
    if (!token) return

    await saveToken(token)

    permission.value = Notification.permission

    if (permission.value === 'granted') {
      show.value = false
    }

  } finally {
    loading.value = false
  }
}

onMounted(() => {
  permission.value = Notification.permission

  // khusus seller → wajib aktif
  if (permission.value !== 'granted') {
    show.value = true
  }
})

</script>

<template>
  <div
    v-if="show"
    class="notif-overlay"
  >
    <div class="notif-card">

      <div class="notif-icon">
        🔔
      </div>

      <h3 class="notif-title">
        Aktifkan Notifikasi
      </h3>

      <p class="notif-desc">
        Untuk <b>Penjual</b>, notifikasi wajib diaktifkan agar kamu dapat menerima:
      </p>

      <ul class="notif-list">
  <li>
    <span class="notif-list-icon">🛒</span>
    <span>Pesanan baru</span>
  </li>
  <li>
    <span class="notif-list-icon">💬</span>
    <span>Chat dari pembeli</span>
  </li>
  <li>
    <span class="notif-list-icon">💳</span>
    <span>Status pembayaran & pengiriman</span>
  </li>
  <li>
    <span class="notif-list-icon">📢</span>
    <span>Informasi penting lainnya</span>
  </li>
</ul>


      <div
        v-if="permission === 'denied'"
        class="notif-denied"
      >
        <p class="notif-denied-title">
          Notifikasi saat ini diblokir
        </p>

        <p class="notif-denied-desc">
          Silakan buka:
          <br>
          <b>Settings aplikasi / browser → Notifications → Allow</b>
          <br>
          lalu buka ulang aplikasi.
        </p>
      </div>

      <button
        v-else
        class="btn bg-primary"
        :disabled="loading"
        @click="enableNotification"
      >
        <span v-if="!loading">Aktifkan Notifikasi</span>
        <span v-else>Silahkan klik "Allow" / "Izinkan" untuk mengaktifkan notifikasi...</span>
      </button>

    </div>
  </div>
</template>
<style scoped>
.notif-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.notif-card {
  width: 100%;
  max-width: 380px;
  background: #ffffff;
  border-radius: 18px;
  padding: 22px 20px 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: popup 0.25s ease;
}

@keyframes popup {
  from {
    transform: translateY(10px) scale(0.98);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.notif-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #eef2ff;
  color: #4f46e5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin: 0 auto 10px;
}

.notif-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #111827;
}

.notif-desc {
  color: #4b5563;
  margin-bottom: 14px;
}

.notif-list {
  list-style: none;
  padding: 0;
  margin: 0 0 18px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notif-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  /* border: 1px solid #eef2f7; */
  border-radius: 10px;
  padding: 0px 12px;
  color: #111827;
}

.notif-list-icon {
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 8px;
  background: #ecfeff;
  display: flex;
  align-items: center;
  justify-content: center;
}


.notif-denied {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 12px 10px;
  margin-top: 10px;
}

.notif-denied-title {
  font-weight: 700;
  color: #b91c1c;
  margin-bottom: 4px;
}

.notif-denied-desc {
  color: #7f1d1d;
  line-height: 1.4;
}

.notif-btn:active {
  transform: translateY(1px);
}

.notif-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
