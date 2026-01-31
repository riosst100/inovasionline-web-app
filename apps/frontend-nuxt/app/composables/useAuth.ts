type LoginResponse = {
  accessToken: string
}

export const useAuth = () => {
  const accessToken = useState<string | null>('accessToken', () => null)
  const authLoading = useState<boolean>('authLoading', () => true)

  // ✅ ambil API saat runtime, bukan di top-level
  const getAPI = () => {
    const config = useRuntimeConfig()
    return config.public.backendUrl
  }

  const refresh = async () => {
    const API = getAPI()
    const res = await $fetch<LoginResponse>(`${API}/auth/refresh`, {
      method: 'POST',
      credentials: 'include'
    })
    accessToken.value = res.accessToken
  }

  const loginWithGoogle = async (credential: string) => {
    console.log('loginWithGoogle')
    console.log('credential',credential)
    const API = getAPI()
    const res = await $fetch<LoginResponse>(`${API}/auth/google`, {
      method: 'POST',
      body: { credential },
      credentials: 'include'
    })
    accessToken.value = res.accessToken
  }

  const logout = async () => {
    const API = getAPI()
    await $fetch(`${API}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    accessToken.value = null
  }

  return {
    accessToken,
    authLoading,
    refresh,
    loginWithGoogle,
    logout
  }
}
