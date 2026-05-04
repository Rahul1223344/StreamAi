import React, { useState, useRef, type FormEvent } from 'react'
import Header from './Header'
import { checkValidData } from '../utility/validate'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  type User,
  signInWithPopup,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utility/userSlice'
import { USER_AVATAR } from '../utility/constant'
import { auth, provider } from '../utility/firebase'

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

        dispatch(addUser({ uid, email: userEmail, displayName, photoURL }))
        navigate('/home')
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/home')
      }
    } catch (error: any) {
      setErrorMessage(`${error.code} ${error.message}`)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Google Sign-In Error:', error)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      
      <Header />

      {/* 🎬 Background */}
      <div className="absolute inset-0 -z-10">
        <img
          className="w-full h-full object-cover opacity-30"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/6d631aa6-567d-46ef-a644-b5b00e4334d2/web/IN-en-20251215-TRIFECTA-perspective_f1cab02a-e42b-4913-a7d9-c5fe0f94f68d_large.jpg"
          alt="bg"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* 💎 Glass Card */}
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
        className="
          w-full max-w-md mx-4
          bg-black/60 backdrop-blur-md
          p-8 rounded-xl
          shadow-2xl border border-gray-700
          text-white
          hover:scale-[1.01] transition-transform
        "
      >
        {/* 🧠 Title */}
        <h1 className="text-3xl font-bold mb-6 text-center tracking-wide">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>

        {/* 👤 Name */}
        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="
              w-full px-4 py-3 mb-4
              bg-gray-800 rounded-md
              outline-none text-white
              focus:ring-2 focus:ring-red-500
            "
          />
        )}

        {/* 📧 Email */}
        <input
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          className="
            w-full px-4 py-3 mb-4
            bg-gray-800 rounded-md
            outline-none text-white
            focus:ring-2 focus:ring-red-500
          "
        />

        {/* 🔒 Password */}
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="
            w-full px-4 py-3 mb-4
            bg-gray-800 rounded-md
            outline-none text-white
            focus:ring-2 focus:ring-red-500
          "
        />

        {/* ❌ Error */}
        {errorMessage && (
          <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
        )}

        {/* 🔴 Main Button */}
        <button
          type="button"
          onClick={handleButtonClick}
          className="
            w-full py-3 mt-2
            bg-red-600 font-semibold
            rounded-md
            hover:bg-red-700 transition
            shadow-lg
          "
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>

        {/* ➖ Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-600" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        {/* 🔵 Google Button */}
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="
            w-full py-3
            bg-white text-black font-medium
            rounded-md
            hover:bg-gray-200 transition
            flex items-center justify-center gap-3
            shadow-md
          "
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* 🔁 Toggle */}
        <p
          onClick={toggleSignInForm}
          className="mt-6 text-sm text-gray-300 cursor-pointer text-center hover:text-white"
        >
          {isSignInForm
            ? 'New to StreamAI? Sign Up Now'
            : 'Already a user? Sign In'}
        </p>
      </form>
    </div>
  )
}

export default Form