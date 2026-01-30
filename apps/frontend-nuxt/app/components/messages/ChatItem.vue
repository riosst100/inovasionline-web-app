<template>
  <div class="flex items-center gap-3 px-4 py-3 border-b">
    <!-- Avatar -->
    <img
      :src="chat.avatar"
      class="w-12 h-12 rounded-full object-cover"
    />

    <!-- Content -->
    <div class="flex-1">
      <div class="flex items-center gap-2">
        <p class="font-medium text-sm">{{ chat.name }}</p>

        <span
          v-if="chat.badge"
          class="text-[10px] px-1.5 rounded bg-red-500 text-white"
        >
          {{ chat.badge }}
        </span>

        <span
          v-if="chat.tag"
          class="text-[10px] px-1.5 rounded border text-orange-500 border-orange-500"
        >
          {{ chat.tag }}
        </span>
      </div>

      <p class="text-xs text-gray-500 truncate">
        {{ chat.message }}
      </p>
    </div>

    <!-- Right -->
    <div class="text-right">
      <p class="text-xs text-gray-400">{{ chat.date }}</p>

      <span
        v-if="chat.unread"
        class="inline-flex mt-1 w-5 h-5 items-center justify-center
               text-[10px] bg-orange-500 text-white rounded-full"
      >
        {{ chat.unread }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  chat: Object,
})
</script>
