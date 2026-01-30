<script setup lang="ts">
const auth = useAuth()

watchEffect(() => {
  // ⏳ tunggu auth siap
  if (auth.authLoading.value) return

  // ❌ belum login
  if (!auth.accessToken.value) {
    navigateTo('/login', { replace: true })
  }
})

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

import MenuGrid from '@/components/profile/MenuGrid.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 pb-20">
    <ProfileHeader />

    <MenuGrid
      title="Pesanan Saya"
      :items="orders"
    />

    <MenuGrid
      title="Dompet Saya"
      :items="wallet"
    />

    <MenuGrid
      title="Keuangan"
      :items="finance"
    />

    <!-- <BottomNav /> -->
  </div>
</template>