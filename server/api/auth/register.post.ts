import { registerUser } from '../../services/auth/auth.service'


export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  await registerUser({
    email: body.email,
    password: body.password,
    name: body.name
  })

  return { success: true }
})
