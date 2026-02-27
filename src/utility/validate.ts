export const checkValidData = (
  email: string,
  password: string
): string | null => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  )

  const isPasswordValid =
     /^[a-zA-Z0-9]{6,}$/.test(
      password
    )

  if (!isEmailValid) return 'Email ID is not valid'
  if (!isPasswordValid) return 'Password is not valid'

  return null
}