export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth()

  // kalau auth masih loading (misal refresh token)
  if (auth.authLoading.value) return

  if (!auth.accessToken.value) {
    return navigateTo('/login')
  }
})
