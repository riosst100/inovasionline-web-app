<template>
  <div class="min-h-screen flex flex-col">

    <!-- HEADER / BANNER -->
    <div class="relative shrink-0">
      <NuxtImg
        placeholder
        format="avif,webp"
        quality="75"
        :src="seller?.image_banner || '/banner/store-banner-placeholder.png'"
        alt="Logo Seller"
        class="w-full object-cover"
        style="height:8rem"
      />

      <div class="absolute" style="bottom:-60px;left:10px">
        <NuxtImg
          placeholder
          format="avif,webp"
          quality="75"
          :src="seller?.image || '/logo/store-placeholder.png'"
          alt=""
          class="h-20 w-20 rounded-xl profile-image object-cover"
        />
      </div>
    </div>

    <!-- HEADER INFO -->
    <div class="shrink-0">
      <div class="seller-header">
        <h1 class="font-semibold" style="font-size:16px">
          {{ seller?.name }}
        </h1>

        <p class="mt-1 text-xs text-gray-600">
          Desa {{ seller?.desa }}, Kec. {{ seller?.kecamatan }}
        </p>
      </div>

      <!-- Tabs -->
      <div class="flex gap-0 seller-tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          class="seller-tabs-item px-4 py-2 transition"
          :class="activeTab === tab ? 'seller-tabs-item-active' : ''"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- TAB CONTENT (SCROLL AREA) -->
    <div class="flex-1 overflow-y-auto mt-4">

      <!-- Menu -->
      <div v-if="activeTab === 'Menu'">

        <!-- loading produk / skeleton -->
<div
  v-if="!productsLoaded || productsPending"
>
  <SellerProductsSkeleton />
</div>

<!-- kosong -->
<div
  v-else-if="noProducts"
  class="flex flex-col items-center justify-center py-12 text-center text-gray-500"
>
  <p class="text-sm font-medium">Belum ada produk</p>
  <p class="mt-1 text-xs">Penjual belum menambahkan produk.</p>
</div>

<!-- ada data -->
<div
  v-else
  class="space-y-6"
  style="padding: 0px 10px;"
>
          <div
            v-for="group in groupedProducts"
            :key="group.category.id"
          >
            <h3 class="mb-3 text-sm font-bold text-gray-700">
              {{ group.category.name }}
            </h3>

            <div class="space-y-3">
              <div
                v-for="item in group.items"
                :key="item.id"
                class="flex items-start gap-3 border-b border-gray-200 bg-white"
                style="margin-top: 8px;padding: 0 8px 8px 0;"
              >
                <img
                  :src="item.image || '/images/product-placeholder.png'"
                  class="self-center rounded-lg object-cover"
                  style="height:80px;width:80px"
                />

                <div class="flex-1 mt-1">
                  <p class="font-semibold">
                    {{ item.name }}
                  </p>

                  <p class="font-semibold text-[rgb(var(--color-primary))]">
                    Rp {{ Number(item.price).toLocaleString('id-ID') }}
                  </p>

                  <p class="text-xs text-gray-400 mt-2">
                    0 terjual
                  </p>
                </div>

                <div
                  class="flex self-center items-center gap-3 bg-[rgb(var(--color-primary))]"
                  style="justify-content: center;border-radius:20px;gap:5px;padding: 7px 10px;"
                  @click="addToCart(item)"
                >
                  <div>
                    <Icon icon="mingcute:add-fill" class="text-white" style="display:inline" height="14" width="14" />
                  </div>
                  <div class="text-white" style="font-weight: normal;">
                    Pesan
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Review -->
      <div v-if="activeTab === 'Review'" class="space-y-5 px-4">
        <div
          v-for="review in reviews"
          :key="review.id"
          class="flex gap-4"
        >
          <img
            :src="review.avatar"
            class="h-10 w-10 rounded-lg object-cover"
          />

          <div class="flex-1">
            <div class="flex items-center justify-between">
              <p class="font-medium">{{ review.name }}</p>
              <span class="text-xs text-gray-400">{{ review.time }}</span>
            </div>

            <div class="text-yellow-400 text-sm">★★★★★</div>

            <p class="mt-1 text-sm text-gray-600">
              {{ review.comment }}
            </p>
          </div>
        </div>
      </div>

      <!-- Information -->
      <div
        v-if="activeTab === 'Information'"
        class="space-y-3 px-4 text-sm text-gray-600"
      >
        <div>
          <p class="text-gray-400">Patokan</p>
          <p>{{ seller?.patokan }}</p>
        </div>

        <div>
          <p class="text-gray-400">Wilayah</p>
          <p>
            {{ seller?.desa }}, {{ seller?.kecamatan }}, {{ seller?.kota }}
          </p>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import SellerProductsSkeleton from '@/components/skeletons/SellerProductsSkeleton'
import { Icon } from '@iconify/vue'

definePageMeta({ layout: 'shop' })

const tabs = ['Menu', 'Review', 'Information']
const activeTab = ref('Menu')

const route = useRoute()
const config = useRuntimeConfig()

/* ===============================
   SSR – hanya data seller ringan
   =============================== */
const { data: sellerRes, error } = await useAsyncData(
  () => `seller-info-${route.params.slug}`,
  () => $fetch(`${config.public.apiBase}/seller/${route.params.slug}`)
)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Seller tidak ditemukan'
  })
}

const seller = computed(() => sellerRes.value?.seller ?? null)

/* ===============================
   CSR – products (berat)
   =============================== */
const { data: productsRes, pending: productsPending } = useAsyncData(
  () => `seller-products-${route.params.slug}`,
  () =>
    $fetch(
      `${config.public.apiBase}/seller/${route.params.slug}/products`
    ),
  {
    server: false,
    lazy: true
  }
)

const products = computed(() => productsRes.value ?? [])

/* ===============================
   grouping
   =============================== */
const groupedProducts = computed(() => {
  const map = {}

  for (const p of products.value) {
    if (!p?.category) continue

    const key = p.category.id

    if (!map[key]) {
      map[key] = {
        category: p.category,
        items: []
      }
    }

    map[key].items.push(p)
  }

  return Object.values(map)
})

const noProducts = computed(
  () => !productsPending.value && groupedProducts.value.length === 0
)

const productsLoaded = computed(() => {
  return productsPending.value || productsRes.value !== undefined
})


const pageTitle = usePageTitle()

watchEffect(() => {
  pageTitle.value = seller.value?.name || 'Seller Profile'
})


/* ===============================
   title / share meta (SSR ready)
   =============================== */
useHead(() => ({
  title: seller.value?.name || 'Seller Profile',
  meta: [
    {
      property: 'og:title',
      content: seller.value?.name || 'Seller Profile'
    },
    {
      property: 'og:image',
      content:
        seller.value?.image ||
        '/images/vendor-placeholder.png'
    }
  ]
}))

function addToCart (product) {
  console.log('Tambah ke pesanan:', product)
}

const reviews = ref([
  {
    id: 1,
    name: 'Jhon Smith',
    time: 'Yesterday 10:30',
    comment: 'Great food and very fast service!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  }
])
</script>

<style scoped>
.profile-image {
  border: 3px solid white;
}
.seller-header {
  padding-left: 100px;
  padding-top: 9px;
  padding-bottom: 17px;
  padding-right: 10px;
}
.seller-tabs {
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  border-top: 1px solid rgb(229 231 235 / var(--tw-border-opacity, 1));
}
.seller-tabs-item {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(229 231 235 / var(--tw-border-opacity, 1));
}
.seller-tabs-item-active,
.seller-tabs-item:hover {
  color: rgb(var(--color-primary) / var(--tw-text-opacity, 1));
  font-weight: 600;
  border-bottom: 2px solid rgb(var(--color-primary) / var(--tw-text-opacity, 1));
}
</style>
