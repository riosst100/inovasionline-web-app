<template>
  <ClientOnly>
    <template #default>
      <section class="px-4 mt-4">
        <CategorySkeleton v-if="pending" />

        <div v-else class="grid grid-cols-4 gap-4">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/kategori/${category.slug}`"
            class="flex flex-col items-center gap-2"
            prefetch
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

    <!-- optional fallback -->
    <template #fallback>
      <section class="px-4 mt-4">
        <CategorySkeleton />
      </section>
    </template>
  </ClientOnly>
</template>

<script setup>
const { data: categories, pending } = useAsyncData(
  'categories-homepage',
  () => $fetch('/api/categories/homepage'),
  {
    server: false,
    default: () => [],
  }
)
</script>

<style scoped>
.category-item {
  background: white;
  border: 1px solid #e5e7eb;
}
</style>
