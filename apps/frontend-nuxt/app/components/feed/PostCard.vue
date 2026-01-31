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
    <div v-if="post.video" class="relative">
      <!-- VIDEO -->
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

      <!-- PLAY OVERLAY (PAUSE STATE) -->
<div
  v-if="videoPaused"
  class="absolute inset-0 rounded-lg
         bg-black/30
         flex items-center justify-center
         pointer-events-none"
>
  <!-- PLAY BUTTON -->
  <div
    class="bg-black/40 rounded-full
           w-16 h-16
           flex items-center justify-center"
  >
    <Icon
      icon="ph:play-fill"
      class="w-8 h-8 text-white"
    />
  </div>
</div>


      <!-- FULLSCREEN BUTTON (TOP LEFT) -->
      <button
        class="absolute top-2 left-2 bg-black/15 text-white
               w-8 h-8 rounded-full flex items-center justify-center"
        @click.stop="openFullscreen"
      >
        <Icon
          icon="mingcute:fullscreen-line"
          class="w-4 h-4"
        />
      </button>

      <!-- MUTE BUTTON (BOTTOM RIGHT) -->
      <button
        class="absolute bottom-2 right-2 bg-black/15 text-white
               w-8 h-8 rounded-full flex items-center justify-center"
        @click.stop="toggleMute"
      >
        <Icon
          :icon="videoMuted
            ? 'mingcute:volume-mute-fill'
            : 'mingcute:volume-fill'"
          class="w-4 h-4"
        />
      </button>
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
import { Icon } from '@iconify/vue'
import ActionBar from './ActionBar.vue'
import CommentList from './CommentList.vue'

defineProps({ post: Object })

// -----------------------
// STATE
// -----------------------
const videoRef = ref(null)
const videoMuted = ref(true)
const videoPaused = ref(true)
const isUserInteracting = ref(false)
const hasAutoPlayed = ref(false) // ⭐ FLAG PENTING

let observer = null
let clickTimer = null
const CLICK_DELAY = 250

// -----------------------
// INTERSECTION OBSERVER
// -----------------------
const setupObserver = async () => {
  await nextTick()
  if (!videoRef.value) return

  observer = new IntersectionObserver(
    async ([entry]) => {
      if (isUserInteracting.value) return

      const video = videoRef.value
      if (!video) return

      if (entry.isIntersecting) {
        // 🚫 JANGAN AUTOPLAY LAGI
        if (hasAutoPlayed.value) return

        try {
          await video.play()
          videoPaused.value = false
          hasAutoPlayed.value = true // ✅ tandai sudah autoplay
        } catch {}
      } else {
        // AUTO PAUSE SAAT KELUAR VIEWPORT
        video.pause()
        video.muted = true
        videoMuted.value = true
        videoPaused.value = true
      }
    },
    {
      threshold: 0.5,
      rootMargin: '0px 0px -20% 0px',
    }
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
  if (clickTimer) clearTimeout(clickTimer)
  document.removeEventListener('fullscreenchange', onFullscreenChange)
})

// -----------------------
// TAP HANDLER
// -----------------------
const handleTap = () => {
  if (clickTimer) {
    clearTimeout(clickTimer)
    clickTimer = null
    openFullscreen()
  } else {
    clickTimer = setTimeout(() => {
      togglePlay()
      clickTimer = null
    }, CLICK_DELAY)
  }
}

// -----------------------
// PLAY / PAUSE (MANUAL)
// -----------------------
const togglePlay = () => {
  const video = videoRef.value
  if (!video) return

  if (video.paused) {
    video.play()
    videoPaused.value = false
  } else {
    video.pause()
    videoPaused.value = true
  }
}

// -----------------------
// MUTE
// -----------------------
const toggleMute = () => {
  const video = videoRef.value
  if (!video) return

  video.muted = !video.muted
  videoMuted.value = video.muted
}

// -----------------------
// FULLSCREEN
// -----------------------
const openFullscreen = async () => {
  const video = videoRef.value
  if (!video) return

  isUserInteracting.value = true

  if (observer) {
    observer.disconnect()
    observer = null
  }

  video.muted = false
  videoMuted.value = false

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
