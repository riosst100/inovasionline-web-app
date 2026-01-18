import { loginUser } from '../../services/auth/auth.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { accessToken, refreshToken } = await loginUser(
    body.email,
    body.password
  )

  setCookie(event, 'refresh_token', refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30
  })

  return { accessToken }
})
