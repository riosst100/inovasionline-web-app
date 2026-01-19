<!-- components/HomeCategories.vue -->
<template>
  <section class="px-4 mt-4">
    <div class="grid grid-cols-4 gap-4 text-center text-xs">
      <Category icon="🎫" label="Event" />
      <Category icon="🧑‍💼" label="EO" />
      <Category icon="🔊" label="Sound" />
      <Category icon="🎤" label="Stage" />
      <Category icon="💡" label="Lighting" />
      <Category icon="🎶" label="Artist" />
      <Category icon="🍔" label="F&B" />
      <Category icon="➕" label="Lainnya" />
    </div>
  </section>
</template>

<script setup>
const Category = defineComponent({
  props: ['icon', 'label'],
  template: `
    <div class="flex flex-col items-center gap-1">
      <div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-lg">
        {{ icon }}
      </div>
      <span>{{ label }}</span>
    </div>
  `
})
</script>
