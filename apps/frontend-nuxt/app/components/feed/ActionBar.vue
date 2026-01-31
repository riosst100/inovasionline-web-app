<template>
  <div class="flex justify-around text-sm text-gray-600 border-t pt-3 mt-3">
    <button @click="likes++">👍 Like {{ likes }}</button>
    <button>💬 Comment</button>
    <button @click="shares++">↗ Share {{ shares }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  likes: Number,
  shares: Number,
})

const likes = ref(props.likes)
const shares = ref(props.shares)
</script>
