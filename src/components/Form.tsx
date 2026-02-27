import React, { useState, useRef, type FormEvent } from 'react'
import Header from './Header'
import { checkValidData } from '../utility/validate'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
 type User,
} from 'firebase/auth'
import { auth } from '../utility/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utility/userSlice'
import { USER_AVATAR } from '../utility/constant'

const Form: React.FC = () => {
  const [isSignInForm, setIsSignInForm] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toggleSignInForm = (): void => {
    setIsSignInForm((prev) => !prev)
    setErrorMessage(null)
  }

  const handleButtonClick = async (): Promise<void> => {
    if (!emailRef.current || !passwordRef.current) return

    const email = emailRef.current.value
    const password = passwordRef.current.value

    const message = checkValidData(email, password)
    setErrorMessage(message)
    if (message) return

    try {
      if (!isSignInForm) {
        // SIGN UP
        if (!nameRef.current) return
        const fullName = nameRef.current.value

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        )

        const user: User = userCredential.user

        await updateProfile(user, {
          displayName: fullName,
          photoURL: USER_AVATAR,
        })

        const { uid, email: userEmail, displayName, photoURL } =
          auth.currentUser as User

        dispatch(
          addUser({
            uid,
            email: userEmail,
            displayName,
            photoURL,
          }),
        )

        navigate('/home')
      } else {
        // SIGN IN
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/home')
      }
    } catch (error: any) {
      setErrorMessage(`${error.code} ${error.message}`)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Header />

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/6d631aa6-567d-46ef-a644-b5b00e4334d2/web/IN-en-20251215-TRIFECTA-perspective_f1cab02a-e42b-4913-a7d9-c5fe0f94f68d_large.jpg"
          alt="body"
        />
      </div>

      {/* Form Wrapper */}
      <div className="flex justify-center pt-20 sm:pt-24">
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
          className="text-white bg-black/80 w-full max-w-md mx-4 p-6 sm:p-8 rounded"
        >
          <h1 className="font-bold text-2xl sm:text-3xl py-4">
            {isSignInForm ? 'Sign In' : 'Sign Up'}
          </h1>

          {!isSignInForm && (
            <input
              ref={nameRef}
              type="text"
              placeholder="Full Name"
              className="p-3 my-3 sm:my-4 bg-gray-700 w-full rounded"
            />
          )}

          <input
            ref={emailRef}
            type="email"
            placeholder="Email Address"
            className="p-3 my-3 sm:my-4 bg-gray-700 w-full rounded"
          />

          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="p-3 my-3 sm:my-4 bg-gray-700 w-full rounded"
          />

          {errorMessage && (
            <p className="text-sm sm:text-base text-red-600 mt-2">
              {errorMessage}
            </p>
          )}

          <button
            type="button"
            className="bg-red-500 w-full p-3 my-5 sm:my-6 rounded hover:bg-red-600"
            onClick={handleButtonClick}
          >
            {isSignInForm ? 'Sign In' : 'Sign Up'}
          </button>

          <p
            onClick={toggleSignInForm}
            className="cursor-pointer text-sm text-gray-300 hover:text-white"
          >
            {isSignInForm
              ? 'New to Netflix? Sign Up Now'
              : 'Already a User? Please Sign In'}
          </p>
        </form>
      </div>
    </div>
  )
}

export default Form
