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
    padding-top: 9px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgb(229 231 235 / var(--tw-border-opacity, 1));
  }
  .seller-tabs-item-active,.seller-tabs-item:hover {
    color: rgb(var(--color-primary) / var(--tw-text-opacity, 1));
    font-weight: 600;
    border-bottom: 3px solid rgb(var(--color-primary) / var(--tw-text-opacity, 1));
  }
</style>
<template>
  <div class="min-h-screen">

    <!-- HEADER / BANNER -->
    <div class="relative">
      <!-- banner diperkecil -->
      <NuxtImg
        placeholder
        format="avif,webp"
        quality="75"
        :src="seller.image || '/images/vendor-placeholder.png'"
        alt=""
        class="w-full object-cover"
        style="height:9rem"
      />
      <!-- profile photo -->
      <div class="absolute" style="bottom:-60px;left:10px">
        <NuxtImg
          placeholder
          format="avif,webp"
          quality="75"
          :src="seller.image || '/images/vendor-placeholder.png'"
          alt=""
          class="h-20 w-20 rounded-xl profile-image object-cover"
        />
      </div>
    </div>
    <div>
      <div class="seller-header">
        <!-- nama + info -->
        <h1 class="font-semibold" style="font-size:16px">
          {{ seller.name }}
        </h1>
        <p class="mt-1 text-xs text-gray-600">
          Desa {{ seller.desa}}, Kec. {{ seller.kecamatan}}
        </p>
      </div>
      <!-- Tabs -->
      <div class="flex gap-0 seller-tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          class="seller-tabs-item px-4 py-2 transition"
          :class="activeTab === tab
            ? 'seller-tabs-item-active'
            : ''"
        >
          {{ tab }}
        </button>
      </div>

      <!-- TAB CONTENT -->
      <div class="mt-6 pb-10">
        <!-- Menu -->
        <div v-if="activeTab === 'Menu'" class="space-y-4">
          <div
            v-for="item in menu"
            :key="item.id"
            class="flex items-center gap-4 rounded-xl bg-neutral-800 p-3"
          >
            <img
              :src="item.image"
              class="h-16 w-16 rounded-lg object-cover"
            />

            <div class="flex-1">
              <p class="font-medium">{{ item.name }}</p>
              <p class="text-sm text-neutral-400">{{ item.desc }}</p>
            </div>

            <p class="text-sm font-semibold text-orange-400">
              {{ item.price }}
            </p>
          </div>
        </div>

        <!-- Review -->
        <div v-if="activeTab === 'Review'" class="space-y-5">
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
                <span class="text-xs text-neutral-400">{{ review.time }}</span>
              </div>

              <div class="text-yellow-400 text-sm">★★★★★</div>

              <p class="mt-1 text-sm text-neutral-300">
                {{ review.comment }}
              </p>
            </div>
          </div>
        </div>

        <!-- Information -->
        <div
          v-if="activeTab === 'Information'"
          class="space-y-3 text-sm text-neutral-300"
        >
          <div>
            <p class="text-neutral-400">Phone</p>
            <p>{{ seller.phone }}</p>
          </div>

          <div>
            <p class="text-neutral-400">Opening Hours</p>
            <p>{{ seller.hours }}</p>
          </div>

          <div>
            <p class="text-neutral-400">Description</p>
            <p>{{ seller.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ['Menu', 'Review', 'Information']
const activeTab = ref('Menu')

definePageMeta({
  layout: 'shop'
})

const route = useRoute()
const config = useRuntimeConfig()

const { data, pending, error } = await useAsyncData(
  `seller-${route.params.slug}`,
  () =>
    $fetch(
      `${config.public.apiBase}/seller/${route.params.slug}`
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
    statusMessage: 'Seller tidak ditemukan',
  })
}

const seller = computed(() => data.value?.seller ?? null)

const pageTitle = usePageTitle()

watchEffect(() => {
  pageTitle.value = seller.value?.name || 'Seller Profile'
})

useHead(() => ({
  title: pageTitle.value
}))

// const seller = {
//   name: 'Food Order Restaurant',
//   address: '70th Street, 80 R 20th St, RU',
//   openTime: '10:00 - 05:00',
//   rating: 4.9,
//   reviews: 1220,
//   phone: '+7 999 123 4567',
//   hours: 'Everyday, 10:00 - 05:00',
//   description:
//     'A cozy restaurant serving modern food with fresh ingredients and fast service.',
//   cover:
//     'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop',

//   // FOTO PROFILE (kotak)
//   avatar:
//     'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=400&auto=format&fit=crop'
// }

const menu = [
  {
    id: 1,
    name: 'Grilled Chicken Bowl',
    desc: 'Chicken, rice, vegetables',
    price: '$8.50',
    image:
      'https://images.unsplash.com/photo-1604908177522-0400c6f2c7c3?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Beef Burger',
    desc: 'Beef, cheese, special sauce',
    price: '$6.90',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format&fit=crop'
  }
]

const reviews = [
  {
    id: 1,
    name: 'Jhon Smith',
    time: 'Yesterday 10:30',
    comment: 'Great food and very fast service!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  }
]
</script>
