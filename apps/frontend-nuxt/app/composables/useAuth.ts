type LoginResponse = {
  accessToken: string
}

export const useAuth = () => {
  const accessToken = useState<string | null>('accessToken', () => null)
  const authLoading = useState<boolean>('authLoading', () => true)

  const getAPI = () => {
    const config = useRuntimeConfig()
    return config.public.backendUrl
  }

  const refresh = async () => {
    const API = getAPI()

    try {
      const res = await $fetch<LoginResponse>(`${API}/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
      })

      accessToken.value = res.accessToken
      return res

    } catch (err: any) {

      // refresh gagal (401, 403, dll) = normal
      accessToken.value = null
      return null
    } finally {
      authLoading.value = false
    }
  }

  const logout = async () => {
    const API = getAPI()

    try {
      await $fetch(`${API}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (e) {
      // boleh diabaikan
    } finally {
      accessToken.value = null
    }
  }

  return {
    accessToken,
    authLoading,
    refresh,
    logout
  }
}
