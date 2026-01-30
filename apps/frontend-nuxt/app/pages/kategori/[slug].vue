<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

const { data, pending, error } = await useAsyncData(
  `category-${route.params.slug}`,
  () =>
    $fetch(
      `${config.public.apiBase}/categories/${route.params.slug}`
    ),
  {
    server: true, // karena Express terpisah
    lazy: false,
    default: () => null,
  }
)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Kategori tidak ditemukan',
  })
}

const category = computed(() => data.value?.category)
const vendors = computed(() => data.value?.vendors ?? [])
const products = computed(() => data.value?.products ?? [])
</script>

<template>
  <div class="page">
    <!-- LOADING -->
    <CategorySkeleton v-if="pending || !category" />

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

      <!-- ================= CONTENT ================= -->
      <div class="px-4 pb-8">
        <div class="bg-white rounded-2xl p-4">

          <!-- ========== SEMUA SELLER ========== -->
          <div v-if="vendors.length" class="mt-2">
            <h2 class="text-base font-semibold text-gray-900 mb-3">
              Semua Seller
            </h2>

            <div class="flex gap-3 overflow-x-auto no-scrollbar">
              <div
                v-for="vendor in vendors"
                :key="vendor.id"
                class="
                  min-w-[140px]
                  bg-white
                  border border-gray-100
                  rounded-xl
                  p-3
                  shadow-sm
                  shrink-0
                "
              >
                <div class="h-16 bg-gray-200 rounded-lg mb-2" />

                <p class="text-sm font-semibold text-gray-900 leading-tight">
                  {{ vendor.name }}
                </p>

                <p class="text-xs text-gray-500 mt-0.5">
                  {{ vendor.products?.length || 0 }} produk
                </p>
              </div>
            </div>
          </div>

          <!-- ========== SEMUA PRODUK ========== -->
          <div v-if="products.length" class="mt-8">
            <h2 class="text-base font-semibold text-gray-900 mb-3">
              Semua Produk
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
          <div
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
          </div>

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
