type LoginResponse = {
  accessToken: string
}

export const useAuth = () => {
  // access token (null = not logged in)
  const accessToken = useState<string | null>('accessToken', () => null)

  // global loading flag (SATU-SATUNYA)
  const authLoading = useState<boolean>('authLoading', () => true)

  /**
   * Silent refresh (dipanggil sekali di app.vue)
   */
  const refresh = async () => {
    try {
      const res = await $fetch<LoginResponse>('/api/auth/refresh', {
        method: 'POST'
      })
      accessToken.value = res.accessToken
    } catch {
      accessToken.value = null
    }
  }

  const login = async (email: string, password: string) => {
    const res = await $fetch<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })
    accessToken.value = res.accessToken
  }

  const register = async (name: string, email: string, password: string) => {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { name, email, password }
    })
  }

  /**
   * ✅ LOGOUT (DITAMBAH, FLOW TIDAK DIUBAH)
   */
  const logout = async (redirect = true) => {
    try {
        await $fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // 🔥 WAJIB
        })
    } catch {
        // abaikan error
    }

    accessToken.value = null

    if (redirect) {
        navigateTo('/')
    }
    }

  const loginWithGoogle = async (credential: string) => {
    const res = await $fetch<LoginResponse>(
      `${useRuntimeConfig().public.backendUrl}/auth/google`,
      {
        method: 'POST',
        body: { credential },
        credentials: 'include' // penting untuk cookie
      }
    )

    accessToken.value = res.accessToken
  }



  return {
  accessToken,
  authLoading,
  refresh,
  login,
  register,
  logout,
  loginWithGoogle // ⬅️ INI
}

}
