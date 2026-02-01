<template>
  <footer class="mt-6 text-gray-500 text-center" style="font-size:11px;color:#8e8e8e">
    <div class="mb-3 space-y-1 p-3">
      <NuxtLink
        to="/about-us"
        class="hover:text-gray-700"
      >
        Tentang Kami
      </NuxtLink>
      <span class="delimiter"></span>
      <NuxtLink
        to="/contact-us"
        class="hover:text-gray-700"
      >
        Kontak Kami
      </NuxtLink>
      <!-- <div stlye="margin-bottom:15px"></div> -->
       <span class="delimiter"></span>
      <NuxtLink
        to="/terms-and-conditions"
        class="hover:text-gray-700"
      >
        Syarat & Ketentuan
      </NuxtLink>
      <!-- <span class="delimiter"></span> -->
       <div stlye="margin-bottom:15px"></div>
      <NuxtLink
        to="/privacy-policy"
        class="hover:text-gray-700"
      >
        Kebijakan Privasi
      </NuxtLink>
    </div>

    <hr />

    <div class="pl-3 mt-3">
      Inovasi Online &copy; 2026. All Rights Reserved.
    </div>
  </footer>
</template>
<style scoped>
  .delimiter {
    padding: 0 10px;
  }
</style>