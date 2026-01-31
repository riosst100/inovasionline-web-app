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

      <!-- PLAY OVERLAY (PAUSE STATE ONLY) -->
      <div
        v-if="videoPaused"
        class="absolute inset-0 flex items-center justify-center
               bg-black/30 text-white pointer-events-none"
      >
        <Icon
          icon="ph:play-circle-light"
          class="w-20 h-20"
        />
      </div>

      <!-- FULLSCREEN BUTTON (TOP LEFT) -->
      <button
        class="absolute top-2 left-2 bg-black/15 text-white
               w-8 h-8 rounded-full flex items-center justify-center"
        @click.stop="openFullscreen"
      >
        ⛶
      </button>

      <!-- MUTE BUTTON (BOTTOM RIGHT) -->
      <button
        class="absolute bottom-2 right-2 bg-black/15 text-white
               w-8 h-8 rounded-full flex items-center justify-center"
        @click.stop="toggleMute"
      >
        {{ videoMuted ? '🔇' : '🔊' }}
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
        try {
          await video.play()
          videoPaused.value = false
        } catch {}
      } else {
        // ✅ AUTO PAUSE + AUTO MUTE
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
    // DOUBLE TAP → FULLSCREEN
    clearTimeout(clickTimer)
    clickTimer = null
    openFullscreen()
  } else {
    // SINGLE TAP → PLAY / PAUSE
    clickTimer = setTimeout(() => {
      togglePlay()
      clickTimer = null
    }, CLICK_DELAY)
  }
}

// -----------------------
// PLAY / PAUSE
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
    observer.unobserve(video)
    observer.disconnect()
    observer = null
  }

  // ✅ fullscreen always audible
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
