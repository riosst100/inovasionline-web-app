<script setup lang="ts">
import CategoryBanner from '@/components/category/CategoryBanner.vue'

definePageMeta({
  ssr: false
})

const route = useRoute()
const config = useRuntimeConfig()

const { data, pending, error } = useAsyncData(
  () => `category-${route.params.slug}`,
  () =>
    $fetch(
      `${config.public.apiBase}/categories/${route.params.slug}`
    ),
  {
    server: false
  }
)

const category = computed(() => data.value?.category)
const vendors = computed(() => data.value?.vendors ?? [])
const products = computed(() => data.value?.products ?? [])

// 👉 khusus CSR, jangan throw createError
const isNotFound = computed(() => {
  return !!error.value && !pending.value
})
</script>

<template>
  <div class="page">

    <!-- NOT FOUND -->
    <div
      v-if="isNotFound"
      class="py-20 text-center text-sm text-gray-500"
    >
      Kategori tidak ditemukan
    </div>

    <!-- LOADING -->
    <CategorySkeleton
      v-else-if="pending || !category"
    />

    <template v-else>
      <!-- ================= TOP SECTION ================= -->
      <div class="px-4 pt-4 pb-3">
        <h1 class="text-lg font-semibold text-gray-900 mb-3">
          {{ category.name }}
        </h1>

        <!-- SUB CATEGORY -->
        <div
          v-if="category.children?.length"
          class="flex gap-2 overflow-x-auto no-scrollbar"
        >
          <button
            v-for="sub in category.children"
            :key="sub.id"
            class="
              px-4 py-1.5
              rounded-full
              text-sm
              font-medium
              border
              shrink-0
              transition
              bg-white
              border-gray-200
              text-gray-700
              hover:bg-gray-100
              active:scale-95
            "
          >
            {{ sub.name }}
          </button>
        </div>
      </div>

      <CategoryBanner />

      <!-- ================= CONTENT ================= -->
      <div class="px-4 pt-4">
        <div class="bg-white rounded-2xl">
          <!-- ========== LIST SELLER VERTIKAL ========== -->
          <div v-if="vendors.length" class="mt-2">
            <h2 class="text-base font-semibold text-gray-900 mb-3">
              Top Seller
            </h2>

            <div class="space-y-4">
              <NuxtLink
                v-for="vendor in vendors"
                :to="`/seller/${vendor.id}`"
                :key="vendor.id"
                class="
                  flex
                  items-center
                  gap-3
                  bg-white
                  rounded-xl
                  p-3
                  border border-gray-100
                  shadow-sm
                "
              >
                <!-- IMAGE -->
                <NuxtImg
                  placeholder
                  format="avif,webp"
                  quality="75"
                  :src="vendor.image || '/images/vendor-placeholder.png'"
                  alt=""
                  class="w-20 h-20 rounded-lg object-cover shrink-0"
                />

                <!-- CONTENT -->
                <div class="flex-1">
                  <p class="text-sm font-semibold text-gray-900 leading-tight">
                    {{ vendor.name }}
                  </p>

                  <p class="text-xs text-gray-600 mt-1">
                    Desa {{ vendor.desa}}, Kec. {{ vendor.kecamatan}}
                  </p>

                  <!-- META INFO -->
                  <div class="flex items-center gap-2 mt-3 text-xs text-gray-500">
                    <span class="flex items-center gap-0.5">
                      <span class="text-yellow-400">★</span>
                      {{ vendor.rating || '0.0' }}
                    </span>

                    <span>•</span>
                    <span>100+ pesanan</span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>


          <!-- ========== SEMUA PRODUK ========== -->
          <div v-if="products.length" class="mt-8">
            <h2 class="text-base font-semibold text-gray-900 mb-3">
              Makanan Terlaris
            </h2>

            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="product in products"
                :key="product.id"
                class="
                  bg-white
                  rounded-xl
                  border border-gray-100
                  shadow-sm
                  overflow-hidden
                "
              >
                <!-- IMAGE -->
                <div class="h-28 bg-gray-200" />

                <!-- INFO -->
                <div class="p-3">
                  <h3 class="text-sm font-semibold text-gray-900 leading-snug">
                    {{ product.name }}
                  </h3>

                  <p class="text-xs text-gray-500 mt-0.5">
                    by {{ product.vendor.name }}
                  </p>

                  <p class="mt-2 text-sm font-bold text-green-600">
                    Rp {{ product.price.toLocaleString('id-ID') }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== EMPTY STATE ========== -->
          <!-- <div
            v-if="!products.length"
            class="
              py-20
              flex
              flex-col
              items-center
              justify-center
              text-center
            "
          >
            <div
              class="w-24 h-24 bg-gray-100 rounded-full mb-4 flex items-center justify-center"
            >
              🍽️
            </div>
            <p class="text-sm text-gray-900 font-medium">
              Belum ada produk
            </p>
            <p class="text-xs text-gray-400 mt-1">
              Coba subkategori lain atau kembali nanti
            </p>
          </div> -->

        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
