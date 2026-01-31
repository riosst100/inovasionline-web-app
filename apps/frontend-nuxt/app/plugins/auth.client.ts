export default defineNuxtPlugin(async () => {
  const auth = useAuth()

  if (auth.accessToken.value) return

  try {
    await auth.refresh()
  } catch (e) {
    auth.accessToken.value = null
  } finally {
    auth.authLoading.value = false
  }
})
