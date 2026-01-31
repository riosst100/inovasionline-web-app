<script setup>
import { ref } from 'vue'

const notifications = ref([
  {
    id: 1,
    title: 'Pesanan Berhasil',
    message: 'Pesanan #INV-2026 berhasil diproses.',
    time: '5 menit lalu',
    read: false,
  },
  {
    id: 2,
    title: 'Pembayaran Diterima',
    message: 'Pembayaran sebesar Rp250.000 telah diterima.',
    time: '1 jam lalu',
    read: true,
  },
  {
    id: 3,
    title: 'Promo Baru 🎉',
    message: 'Diskon 20% khusus hari ini!',
    time: 'Kemarin',
    read: false,
  },
])

const markAsRead = (id) => {
  const notif = notifications.value.find(n => n.id === id)
  if (notif) notif.read = true
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8">
    <div class="mx-auto max-w-2xl">
      <!-- Header -->
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-800">Notifikasi</h1>
        <button
          class="text-sm text-blue-600 hover:underline"
          @click="notifications.forEach(n => n.read = true)"
        >
          Tandai semua dibaca
        </button>
      </div>

      <!-- List -->
      <div class="space-y-3">
        <div
          v-for="notif in notifications"
          :key="notif.id"
          class="flex items-start gap-4 rounded-xl border p-4 transition hover:shadow-sm"
          :class="notif.read ? 'bg-white' : 'bg-blue-50 border-blue-200'"
        >
          <!-- Dot -->
          <span
            v-if="!notif.read"
            class="mt-2 h-2 w-2 rounded-full bg-blue-500"
          />

          <!-- Content -->
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h2 class="font-semibold text-gray-800">
                {{ notif.title }}
              </h2>
              <span class="text-xs text-gray-400">
                {{ notif.time }}
              </span>
            </div>
            <p class="mt-1 text-sm text-gray-600">
              {{ notif.message }}
            </p>

            <button
              v-if="!notif.read"
              class="mt-2 text-xs text-blue-600 hover:underline"
              @click="markAsRead(notif.id)"
            >
              Tandai dibaca
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="notifications.length === 0"
        class="mt-16 text-center text-gray-500"
      >
        Tidak ada notifikasi 📭
      </div>
    </div>
  </div>
</template>
