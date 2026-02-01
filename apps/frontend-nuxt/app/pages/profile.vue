<script setup lang="ts">
import MenuGrid from '@/components/profile/MenuGrid.vue'

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()

/**
 * 🚪 Logout
 * biarkan middleware auth yang handle redirect
 */
const handleLogout = async () => {
  await auth.logout()
}

const orders = [
  { label: 'Belum Bayar', icon: '💳' },
  { label: 'Dikemas', icon: '📦' },
  { label: 'Dikirim', icon: '🚚' },
  { label: 'Beri Penilaian', icon: '⭐', badge: 21 },
]

const wallet = [
  { label: 'ShopeePay', value: 'Rp0' },
  { label: 'Koin', value: 'Gratis 25RB' },
  { label: 'Voucher', value: '50+ Voucher' },
  { label: 'Check-in', value: 's.d. 50RB', badge: 'Baru' },
]

const finance = [
  { label: 'SPayLater', value: 'Rp21.000.000' },
  { label: 'SPinjam', value: 'Diskon 35%' },
  { label: 'SeaBank', value: 'Gratis Transfer' },
  { label: 'Asuransi', value: 'Rp1JT' },
]
</script>

<template>
  <div class="min-h-screen bg-gray-100 pb-20">
    <ProfileHeader />

    <!-- 🔴 LOGOUT BUTTON -->
    <div class="px-4 mt-3">
      <button
        @click="handleLogout"
        class="w-full rounded-xl bg-red-500 py-2 text-white font-semibold"
      >
        Keluar
      </button>
    </div>

    <MenuGrid title="Pesanan Saya" :items="orders" />
    <MenuGrid title="Dompet Saya" :items="wallet" />
    <MenuGrid title="Keuangan" :items="finance" />
  </div>
</template>
