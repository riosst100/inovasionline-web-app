<script setup>
    import { Icon } from '@iconify/vue'

    const pageTitle = usePageTitle()
    const router = useRouter()

    function backPage () {
        // kalau ada page sebelumnya
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push('/')
        }
    }
</script>

<template>
  <header class="header top-0 z-20">
    <div class="flex items-center justify-between px-4 h-[3rem]">
      <div class="flex items-center gap-[15px] text-gray-600">
        <div @click="backPage" class="header-icon text-2xl md:hidden" style="cursor:pointer"><Icon icon="line-md:arrow-left" width="25" height="25" /></div>
          <h1 class="font-semibold text-white" style="text-shadow: 0px 0px 11px #0000006b;">{{  pageTitle  }}</h1>
      </div>
    </div>
  </header>
</template>

<style scoped>
    .header {
        position: fixed;
        background: #00000063;
        width: 100%;
    }
    .header-icon {
        border-radius: 5px;
        color:white;
    }
</style>