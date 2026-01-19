<template>
  <section class="px-4 mt-4">
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="category in categories"
        :key="category.id"
        class="flex flex-col items-center gap-2"
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
      </div>
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
    id: 1,
    name: 'Makanan & Minuman',
    icon: '/categories/food-beverages.webp',
  },
  {
    id: 2,
    name: 'Percetakan',
    icon: '/categories/printing.webp',
  },
  {
    id: 2,
    name: 'Jasa & Servis',
    icon: '/categories/services.webp',
  },
  {
    id: 2,
    name: 'Rental / Sewa',
    icon: '/categories/rent.webp',
  },
  {
    id: 2,
    name: 'Event / Acara',
    icon: '/categories/calendar.webp',
  },
  {
    id: 2,
    name: 'Tiket Konser',
    icon: '/categories/ticket.webp',
  },
  {
    id: 2,
    name: 'Hewan Peliharaan',
    icon: '/categories/pets.webp',
  }
]
</script>
