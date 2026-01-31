export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth()

  // ✅ biarkan halaman login & login-success
  if (to.path === '/login' || to.path === '/login-success') return

  if (!auth.accessToken.value) {
    return navigateTo('/login')
  }
})
