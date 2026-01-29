export default defineNuxtPlugin(() => {
  const auth = useAuth()

  const api = $fetch.create({
    onRequest({ options }) {
      if (auth.accessToken.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${auth.accessToken.value}`
        }
      }
    },

    async onResponseError({ response }) {
      if (response.status === 401) {
        try {
          await auth.refresh()
        } catch {
          auth.accessToken.value = null
          navigateTo('/login')
        }
      }
    }
  })

  return {
    provide: { api }
  }
})
