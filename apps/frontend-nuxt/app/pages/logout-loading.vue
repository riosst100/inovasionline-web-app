<script setup lang="ts">
definePageMeta({
  layout: false,
  ssr: false
})

onMounted(() => {
  const auth = useAuth()

  // pastiin 1 frame ke-paint
  requestAnimationFrame(() => {
    // 🔥 delay biar spinner keliatan
    setTimeout(() => {
      // redirect dulu
      navigateTo('/', { replace: true })

      // logout di belakang (fire & forget)
      auth.logout().catch(() => {})
    }, 1000) // ⏱️ atur 300–800ms sesuai selera
  })
})
</script>
