<template>
  <section class="mt-4">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="16"
      :slides-offset-before="16"
      :slides-offset-after="16"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false
      }"
      :pagination="{ clickable: true }"
    >
      <SwiperSlide
        v-for="(banner, index) in banners"
        :key="index"
      >
        <div class="banner-card">
          <img
            :src="banner"
            alt="Banner"
            class="banner-img"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>


<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Pagination, Autoplay]

const banners = [
  '/banner/banner-25-01-2026-1.png',
  '/banner/banner2.webp',
  '/banner/banner3.webp',
]
</script>
<style scoped>
.banner-card {
  border-radius: 16px; /* atau rounded-app */
  overflow: hidden;   /* penting */
}

.banner-img {
  width: 100%;
  height: 100%; /* h-40 */
  object-fit: cover;
  display: block;
}

/* pagination tetap */
.swiper-pagination-bullet {
  background: rgb(var(--color-muted));
  opacity: 1;
}

.swiper-pagination-bullet-active {
  background: rgb(var(--color-primary));
}


</style>