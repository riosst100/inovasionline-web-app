export default defineNuxtPlugin(() => {
  const auth = useAuth()
  auth.authLoading.value = false
})