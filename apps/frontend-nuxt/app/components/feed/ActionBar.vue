<template>
  <div class="flex justify-around text-sm text-gray-600 border-t pt-3 mt-3">
    <button
      class="flex items-center gap-1 hover:text-blue-500"
      @click="likes++"
    >
      <Icon icon="stash:thumb-up" class="post-icon" />
      {{ likes }}
    </button>

    <button class="flex items-center gap-1 hover:text-blue-500">
      <Icon icon="iconamoon:comment-light" class="post-icon" />
      {{ shares }}
    </button>

    <button
      class="flex items-center gap-1 hover:text-blue-500"
      @click="shares++"
    >
      <Icon icon="ph:share-fat" class="post-icon" />
      {{ shares }}
    </button>
  </div>
</template>

<style scoped>
  .post-icon {
    width: 22px;
    height: 22px;
  }
</style>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  }
})

const likes = ref(props.likes)
const shares = ref(props.shares)
</script>
