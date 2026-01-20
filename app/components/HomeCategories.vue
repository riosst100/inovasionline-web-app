<template>
  <section class="px-4 mt-4">
    <div class="grid grid-cols-4 gap-4">
      <a
        v-for="category in categories"
        :key="category.id"
        class="flex flex-col items-center gap-2"
        :href="category.url_path"
      >
        <div
          class="w-14 h-14 rounded-full category-item flex items-center justify-center"
        >
          <img
            :src="category.icon"
            :alt="category.name"
            class="w-7 h-7"
          />
        </div>
        <span class="text-xs text-gray-700 text-center">
          {{ category.name }}
        </span>
      </a>
    </div>
  </section>
</template>
<style scoped>
    .category-item {
        background: white;
        border: 1px solid #e5e7eb;
    }
</style>
<script setup>
const categories = [
  {
    url_path: '/categories/food-beverages',
    name: 'Makanan & Minuman',
    icon: '/categories/food-beverages.webp',
  },
  {
    url_path: '/categories/okokokoo',
    name: 'Percetakan',
    icon: '/categories/printing.webp',
  },
  // {
  //   id: 2,
  //   name: 'Lowongan Pekerjaan',
  //   icon: '/categories/jobs.webp',
  // },
  {
    url_path: '/categories/okokokoo',
    name: 'Jasa & Servis',
    icon: '/categories/services.webp',
  },
  {
    url_path: '/categories/okokokoo',
    name: 'Rental / Sewa',
    icon: '/categories/rent.webp',
  },
  {
    url_path: '/categories/okokokoo',
    name: 'Event / Acara',
    icon: '/categories/calendar.webp',
  },
  {
    url_path: '/categories/okokokoo',
    name: 'Tiket Konser',
    icon: '/categories/ticket.webp',
  },
  {
    url_path: '/categories/okokokoo',
    name: 'Tanaman Hias',
    icon: '/categories/plants.webp',
  },
  {
    url_path: '/categories/okokokoo',
    name: 'Hewan Peliharaan',
    icon: '/categories/pets.webp',
  },
]
</script>
