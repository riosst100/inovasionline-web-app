<template>
  <div
    class="bg-white rounded-xl p-4 shadow-sm"
    style="margin: 8px; margin-bottom: 15px;"
  >
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
      v-if="post.video"
      class="relative"
      @mouseenter="showHintTemporarily()"
      @touchstart.passive="showHintTemporarily()"
    >
      <video
        ref="videoRef"
        muted
        loop
        playsinline
        preload="metadata"
        class="rounded-lg w-full cursor-pointer"
        @click="handleTap"
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
        • 1 tap: mute • 2 tap: fullscreen
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
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import ActionBar from './ActionBar.vue'
import CommentList from './CommentList.vue'

defineProps({ post: Object })

// -----------------------
// STATE
// -----------------------
const videoRef = ref(null)
const showHint = ref(false)
const isUserInteracting = ref(false)
let observer = null
let hintTimer = null

// click detection
let clickTimer = null
const CLICK_DELAY = 250 // ms (ideal for mobile)

// -----------------------
// HINT
// -----------------------
const showHintTemporarily = (duration = 2000) => {
  showHint.value = true
  if (hintTimer) clearTimeout(hintTimer)
  hintTimer = setTimeout(() => (showHint.value = false), duration)
}

// -----------------------
// OBSERVER
// -----------------------
const setupObserver = async () => {
  await nextTick()
  if (!videoRef.value) return

  observer = new IntersectionObserver(
    async ([entry]) => {
      if (isUserInteracting.value) return
      if (entry.isIntersecting) {
        try { await videoRef.value.play() } catch {}
      } else {
        videoRef.value.pause()
      }
    },
    { threshold: 0.5, rootMargin: '0px 0px -20% 0px' }
  )

  observer.observe(videoRef.value)
}

// -----------------------
// LIFECYCLE
// -----------------------
onMounted(() => {
  setupObserver()
  document.addEventListener('fullscreenchange', onFullscreenChange)
})

onBeforeUnmount(() => {
  if (observer && videoRef.value) {
    observer.unobserve(videoRef.value)
    observer.disconnect()
  }
  if (hintTimer) clearTimeout(hintTimer)
  if (clickTimer) clearTimeout(clickTimer)
  document.removeEventListener('fullscreenchange', onFullscreenChange)
})

// -----------------------
// TAP HANDLER
// -----------------------
const handleTap = () => {
  if (clickTimer) {
    // 🔥 DOUBLE TAP
    clearTimeout(clickTimer)
    clickTimer = null
    openFullscreen()
  } else {
    // ⏱ WAIT FOR DOUBLE TAP
    clickTimer = setTimeout(() => {
      toggleMute()
      clickTimer = null
    }, CLICK_DELAY)
  }
}

// -----------------------
// SINGLE TAP = MUTE
// -----------------------
const toggleMute = () => {
  const video = videoRef.value
  if (!video) return

  video.muted = !video.muted
}

// -----------------------
// DOUBLE TAP = FULLSCREEN
// -----------------------
const openFullscreen = async () => {
  const video = videoRef.value
  if (!video) return

  isUserInteracting.value = true
  showHint.value = false
  if (hintTimer) clearTimeout(hintTimer)

  if (observer) {
    observer.unobserve(video)
    observer.disconnect()
    observer = null
  }

  video.muted = false
  try { await video.play() } catch {}

  if (video.requestFullscreen) {
    video.requestFullscreen()
  } else if (video.webkitEnterFullscreen) {
    video.webkitEnterFullscreen()
  }
}

// -----------------------
// EXIT FULLSCREEN
// -----------------------
const onFullscreenChange = () => {
  if (!document.fullscreenElement && videoRef.value) {
    isUserInteracting.value = false
    setupObserver()
  }
}
</script>
