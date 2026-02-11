<template>
  <div class="space-y-6 px-[10px] animate-pulse">

    <!-- group -->
    <div
      v-for="g in 2"
      :key="g"
    >
      <!-- category title -->
      <div class="mb-3">
        <div class="h-4 w-28 bg-gray-200 rounded"></div>
      </div>

      <!-- items -->
      <div class="space-y-3">
        <div
          v-for="i in 3"
          :key="i"
          class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3"
        >
          <!-- image -->
          <div class="h-16 w-16 rounded-lg bg-gray-200 shrink-0"></div>

          <!-- text -->
          <div class="flex-1 space-y-2">
            <div class="h-3 w-4/5 bg-gray-200 rounded"></div>
            <div class="h-3 w-1/3 bg-gray-200 rounded"></div>
          </div>

          <!-- button -->
          <div class="h-7 w-12 rounded-lg bg-gray-200 shrink-0"></div>
        </div>
      </div>
    </div>

  </div>
</template>
