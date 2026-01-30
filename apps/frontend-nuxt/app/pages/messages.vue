<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <div class="flex items-center gap-3 px-4 py-3 border-b">
      <button class="text-xl">←</button>
      <h1 class="text-lg font-semibold">Chat</h1>
    </div>

    <ChatFilter />

    <!-- Chat List -->
    <div>
      <ChatItem
        v-for="chat in chats"
        :key="chat.id"
        :chat="chat"
      />
    </div>
  </div>
</template>

<script setup>
import ChatItem from '@/components/messages/ChatItem.vue'
import ChatFilter from '@/components/messages/ChatFilter.vue'

const chats = [
  {
    id: 1,
    name: 'pitulasan25',
    message: '[Asisten AI Toko] Hai inovasiaktif, pilihan bag...',
    avatar: 'https://via.placeholder.com/48',
    date: 'Rabu',
  },
  {
    id: 2,
    name: 'UGREEN Official Store',
    message: 'Beri ulasan untuk mendapatkan Koin Sho...',
    avatar: 'https://via.placeholder.com/48',
    date: '24/01',
    badge: 'LIVE',
    unread: 1,
  },
  {
    id: 3,
    name: 'centralmediajakarta',
    message: 'centralmediajkt akan membantumu',
    avatar: 'https://via.placeholder.com/48',
    date: '22/01',
    badge: 'Star',
  },
  {
    id: 4,
    name: 'Layanan Keuangan',
    message: '[SPayLater-mu Menunggu] 0 hari sebelum jat...',
    avatar: 'https://via.placeholder.com/48',
    date: '25/11/25',
    tag: 'Official',
  },
]
</script>
