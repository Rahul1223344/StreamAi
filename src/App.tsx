import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import type { ReactElement } from 'react'
import MovieDetails from './pages/MoviesDetails'
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector, useDispatch } from 'react-redux'
import LoadingScreen from './pages/LoadingScreen'
import type { RootState, AppDispatch } from './utility/appStore'
import { useEffect } from 'react'
import { auth } from './utility/firebase'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { addUser, removeUser, setAuthLoading } from './utility/userSlice'
import PublicRoute from './components/PublicRoute'

const router = createBrowserRouter([
  { path: '/', element:    <PublicRoute>
      <Login />
    </PublicRoute>},
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/movie/:id',
    element: (
      <ProtectedRoute>
        <MovieDetails />
      </ProtectedRoute>
    ),
  },
])

function App(): ReactElement {
  const user = useSelector((store: RootState) => store.user)
  const dispatch = useDispatch<AppDispatch>()

  /* 🔥 MOVE AUTH HERE */
  useEffect(() => {
    dispatch(setAuthLoading(true))

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: User | null) => {
        if (firebaseUser) {
          const { uid, email, displayName, photoURL } = firebaseUser
          dispatch(addUser({ uid, email, displayName, photoURL }))
        } else {
          dispatch(removeUser())
        }

        dispatch(setAuthLoading(false))
      }
    )

    return () => unsubscribe()
  }, [dispatch])

  /* 🔥 BLOCK UNTIL READY */
  if (user.isLoading) {
    return <LoadingScreen />
  }

  return <RouterProvider router={router} />
}

export default App