interface FormData {
  email: string
  pass: string
  userName?: string
}

const validate = (formData: FormData): string => {
  let errors: string = ""

  // Email validation
  if (!formData.email) {
    errors = "Email is required"
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    errors = "Invalid email address"
  }

  // Password validation
  if (!formData.pass) {
    errors = "Password is required"
  } else if (formData.pass.length < 6) {
    errors = "Password must be at least 6 characters"
  }

  return errors
}

export default validate

