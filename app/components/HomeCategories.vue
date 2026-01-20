<template>
  <CategorySkeleton v-if="pending" />
  <template v-else>
    <section class="px-4 mt-4">
      <div class="grid grid-cols-4 gap-4">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/kategori/${category.slug}`"
          class="flex flex-col items-center gap-2"
        >
          <div
            class="w-14 h-14 rounded-full category-item flex items-center justify-center"
          >
            <img
              v-if="category.icon"
              :src="`/categories/${category.icon}.webp`"
              :alt="category.name"
              class="w-7 h-7"
            />
          </div>

          <span class="text-xs text-gray-700 text-center">
            {{ category.name }}
          </span>
        </NuxtLink>
      </div>
    </section>
  </template>
</template>

<style scoped>
.category-item {
  background: white;
  border: 1px solid #e5e7eb;
}
</style>
<script setup>
  const { data: categories } = await useAsyncData(
  'categories-homepage',
  () => $fetch('/api/categories/homepage'),
  {
    server: false,
    lazy: false,
    default: () => null,
  }
)
</script>
