import { refreshAccessToken } from '../../services/auth/auth.service'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'refresh_token')
  if (!token) {
    throw createError({ statusCode: 401 })
  }

  const { accessToken, refreshToken } = await refreshAccessToken(token)

  setCookie(event, 'refresh_token', refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30
  })

  return { accessToken }
})
