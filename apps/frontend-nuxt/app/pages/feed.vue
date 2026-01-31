<template>
  <div class="min-h-screen bg-gray pb-24">
    <!-- FEED -->
    <div class="mt-2 space-y-4">
      <template v-for="(post, index) in posts" :key="post.id + '-' + index">
        <PostCard :post="post" />

        <!-- IKLAN SETELAH POST KE-2 -->
        <AdCard v-if="index === 1" />

        <!-- IKLAN SETIAP 6 POST (OPSIONAL) -->
        <AdCard v-if="index > 1 && index % 6 === 0" />
      </template>
    </div>
  </div>
</template>

<script setup>
import PostCard from '@/components/feed/PostCard.vue'
import AdCard from '@/components/feed/AdCard.vue'

const posts = ref([
  {
    id: 1,
    user: 'Inovasi Aktif',
    avatar: 'https://via.placeholder.com/40',
    content: 'Lagi ngerjain Nuxt + Tailwind 🔥',
    likes: 12,
    shares: 3,
    comments: [
      { id: 1, user: 'Budi', text: 'Mantap!' },
      { id: 2, user: 'Sari', text: 'Keren 🔥' },
    ],
  },
  {
    id: 2,
    user: 'Tech Store',
    avatar: 'https://via.placeholder.com/40',
    content: 'Produk terbaru kami sudah rilis!',
    image: 'https://placehold.co/600x400/EEE/31343C',
    likes: 20,
    shares: 5,
    comments: [],
  },
  {
    id: 3,
    user: 'Video Creator',
    avatar: 'https://via.placeholder.com/40',
    content: 'Cek video terbaru ini 🎥',
    video: 'https://res.cloudinary.com/dbbaahmxq/video/upload/v1769864402/Download_hfyps1.mp4',
    likes: 50,
    shares: 10,
    comments: [
      { id: 1, user: 'Andi', text: 'Videonya keren!' },
    ],
  },
  {
    id: 4,
    user: 'Tech Store',
    avatar: 'https://via.placeholder.com/40',
    content: 'Produk terbaru kami sudah rilis!',
    image: 'https://placehold.co/600x400/EEE/31343C',
    likes: 20,
    shares: 5,
    comments: [],
  },
  {
    id: 5,
    user: 'Tech Store',
    avatar: 'https://via.placeholder.com/40',
    content: 'Produk terbaru kami sudah rilis!',
    image: 'https://placehold.co/600x400/EEE/31343C',
    likes: 20,
    shares: 5,
    comments: [],
  },
  {
    id: 6,
    user: 'Video Creator',
    avatar: 'https://via.placeholder.com/40',
    content: 'Cek video terbaru ini 🎥',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    likes: 50,
    shares: 10,
    comments: [],
  },
])
</script>
