export default defineEventHandler((event) => {
  // 🔥 hapus refresh token cookie
  deleteCookie(event, 'refresh_token', {
    path: '/',          // HARUS sama dengan saat set cookie
    sameSite: 'lax',
    httpOnly: true,
  })

  return { success: true }
})
