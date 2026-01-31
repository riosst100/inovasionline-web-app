<template>
  <div class="min-h-screen bg-gray pb-20">
    <!-- Feed -->
    <div class="space-y-4 mt-2">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<script setup>
import PostCard from '@/components/feed/PostCard.vue'

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
    image: 'https://via.placeholder.com/400x250',
    likes: 20,
    shares: 5,
    comments: [],
  },
  {
    id: 3,
    user: 'Video Creator',
    avatar: 'https://via.placeholder.com/40',
    content: 'Cek video terbaru ini 🎥',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    likes: 50,
    shares: 10,
    comments: [
      { id: 1, user: 'Andi', text: 'Videonya keren!' },
    ],
  },
])
</script>
