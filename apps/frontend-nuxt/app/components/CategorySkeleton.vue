<template>
  <div class="p-4">
    <div class="h-6 w-1/2 bg-gray-200 rounded mb-4 animate-pulse" />

    <div class="flex gap-2 mb-4">
      <div
        v-for="n in 4"
        :key="n"
        class="h-8 w-24 bg-gray-200 rounded-full animate-pulse"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="n in 6"
        :key="n"
        class="h-40 bg-gray-200 rounded-xl animate-pulse"
      />
    </div>
  </div>
</template>
