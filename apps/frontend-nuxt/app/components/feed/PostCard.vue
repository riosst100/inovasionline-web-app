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
    <video
        v-if="post.video"
        autoplay
        muted
        loop
        playsinline
        class="mt-3 rounded-lg w-full"
        >
        <source :src="post.video" type="video/mp4" />
    </video>


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
</script>
