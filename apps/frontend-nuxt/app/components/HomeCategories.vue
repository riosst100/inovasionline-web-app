<template>
  <section class="px-4 mt-4">
    <div class="grid grid-cols-4 gap-4">
      <NuxtLink
        v-for="category in categories"
        :key="category.id"
        :to="`/kategori/${category.slug}`"
        class="flex flex-col items-center gap-2"
        :prefetch="category.slug === 'food-beverages'"
      >
        <div
          class="w-14 h-14 rounded-full category-item flex items-center justify-center"
        >
          <NuxtImg
            v-if="category.icon"
            :src="`/categories/${category.icon}.webp`"
            :alt="category.name"
            class="w-7 h-7"
            placeholder
            format="avif,webp"
            quality="75"
          />
        </div>

        <span class="text-xs text-gray-700 text-center">
          {{ category.name }}
        </span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig()

const {
  data: categories,
  pending,
  error,
  refresh
} = useAsyncData(
  'categories-homepage',
  async () => {
    const res = await $fetch(`${config.public.apiBase}/homepage`)
    return res
  },
  {
    default: () => [],
    server: false
  }
)
</script>

<style scoped>
.category-item {
  background: white;
  border: 1px solid #e5e7eb;
}
</style>
