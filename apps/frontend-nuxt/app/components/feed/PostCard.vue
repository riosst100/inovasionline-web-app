<template>
  <div
    class="bg-white"
    style="margin: 5px 0;"
  >
    <!-- Header -->
    <div class="flex items-center gap-3 p-4">
      <NuxtImg
        src="/user.png"
        class="w-10 h-10 rounded-full"
        placeholder
        format="avif,webp"
        quality="75"
      />
      <div>
        <p class="font-semibold text-sm">{{ post.user }}</p>
        <p class="text-xs text-gray-400">Just now</p>
      </div>
    </div>

    <!-- Content -->
    <p class="mb-3 text-sm px-4">{{ post.content }}</p>

    <!-- Image -->
    <img
      v-if="post.image"
      :src="post.image"
      class="mt-3 w-full"
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
        class="w-full cursor-pointer"
        @click="handleTap"
      >
        <source :src="post.video" type="video/mp4" />
      </video>

      <!-- PLAY OVERLAY (PAUSE STATE) -->
<div
  v-if="videoPaused"
  class="absolute inset-0
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
    :icon="isGlobalMuted
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
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { Icon } from '@iconify/vue'
import ActionBar from './ActionBar.vue'
import CommentList from './CommentList.vue'

defineProps({ post: Object })

// 🔥 GLOBAL AUDIO (DITAMBAH)
const { isGlobalMuted } = useVideoAudio()

// -----------------------
// STATE (TETAP ADA)
// -----------------------
const videoRef = ref(null)
const videoMuted = ref(true)      // ⬅️ tetap ada
const videoPaused = ref(true)
const isUserInteracting = ref(false)
const hasAutoPlayed = ref(false)

let observer = null
let clickTimer = null
const CLICK_DELAY = 250

// -----------------------
// SYNC GLOBAL → LOCAL (DITAMBAH)
// -----------------------
watch(isGlobalMuted, (muted) => {
  videoMuted.value = muted
  if (videoRef.value) {
    videoRef.value.muted = muted
  }
})

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
        if (hasAutoPlayed.value) return

        try {
          video.muted = isGlobalMuted.value // ⬅️ PAKAI GLOBAL
          await video.play()
          videoPaused.value = false
          hasAutoPlayed.value = true
        } catch {}
      } else {
        video.pause()
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
    video.muted = isGlobalMuted.value
    video.play()
    videoPaused.value = false
  } else {
    video.pause()
    videoPaused.value = true
  }
}

// -----------------------
// MUTE (SEKARANG GLOBAL)
// -----------------------
const toggleMute = () => {
  isGlobalMuted.value = !isGlobalMuted.value
  videoMuted.value = isGlobalMuted.value
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

  // fullscreen selalu unmute (GLOBAL)
  isGlobalMuted.value = false
  videoMuted.value = false
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
