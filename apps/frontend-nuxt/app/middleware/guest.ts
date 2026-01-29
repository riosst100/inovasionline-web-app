export default defineNuxtRouteMiddleware(() => {
  const auth = useAuth()

  // ⛔ TUNGGU sampai auth siap
  if (!auth.authReady.value) {
    return
  }

  // ✅ kalau sudah login → redirect
  if (auth.accessToken.value) {
    return navigateTo('/')
  }
})
