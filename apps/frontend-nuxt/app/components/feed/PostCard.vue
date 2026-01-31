<template>
  <div class="bg-white rounded-xl p-4 shadow-sm" style="margin: 8px;margin-bottom: 15px;">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <img :src="post.avatar" class="w-10 h-10 rounded-full" />
      <div>
        <p class="font-semibold text-sm">{{ post.user }}</p>
        <p class="text-xs text-gray-400">Just now</p>
      </div>
    </div>

    <!-- Content -->
    <p class="mt-3 text-sm">{{ post.content }}</p>

    <!-- Image -->
    <img
      v-if="post.image"
      :src="post.image"
      class="mt-3 rounded-lg w-full"
    />

    <!-- Video -->
    <div
  class="relative"
  @mouseenter="showHint = true"
  @mouseleave="showHint = false"
  @touchstart.passive="showHint = true"
>
  <video
    ref="videoRef"
    muted
    loop
    playsinline
    preload="metadata"
    class="rounded-lg w-full cursor-pointer"
    @click="handleClick"
  >
    <source :src="post.video" type="video/mp4" />
  </video>

  <!-- Overlay hint -->
  <div
    v-if="showHint"
    class="absolute inset-0 flex items-center justify-center
           bg-black/30 text-white text-sm
           pointer-events-none transition-opacity"
  >
    ▶ Tap untuk fullscreen
  </div>


</div>





    <!-- Actions -->
    <ActionBar
      :likes="post.likes"
      :shares="post.shares"
    />

    <!-- Comments -->
    <CommentList
      v-if="post.comments.length"
      :comments="post.comments"
    />
  </div>
</template>

<script setup>
import ActionBar from './ActionBar.vue'
import CommentList from './CommentList.vue'

defineProps({
  post: Object,
})

import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const videoRef = ref(null)
let observer = null
const isUserInteracting = ref(false)

const showHint = ref(false)


onMounted(async () => {
  await nextTick()
  if (!videoRef.value) return

  observer = new IntersectionObserver(
    async ([entry]) => {
      // ⛔ jangan ganggu kalau user lagi interaksi
      if (isUserInteracting.value) return

      if (entry.isIntersecting) {
        try {
          await videoRef.value.play()
        } catch (e) {
          // abaikan silently
        }
      } else {
        videoRef.value.pause()
      }
    },
    { threshold: 0.6 }
  )

  observer.observe(videoRef.value)
})

onBeforeUnmount(() => {
  if (observer && videoRef.value) {
    observer.unobserve(videoRef.value)
  }
})

const handleClick = async () => {
  const video = videoRef.value
  if (!video) return

  isUserInteracting.value = true
  showHint.value = false

  // matikan observer biar ga pause lagi
  if (observer) {
    observer.unobserve(video)
    observer.disconnect()
    observer = null
  }

  video.muted = false

  try {
    await video.play()
  } catch (e) {}

  // fullscreen (cross browser)
  if (video.requestFullscreen) {
    video.requestFullscreen()
  } else if (video.webkitEnterFullscreen) {
    video.webkitEnterFullscreen() // iOS Safari
  }
}
</script>
