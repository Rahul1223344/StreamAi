import { useEffect, useState, type ReactElement } from 'react'
import StreamAiLogo from '../assets/icons/streamAiLogo.svg?react'
import { auth } from '../utility/firebase'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utility/userSlice'
import type { RootState, AppDispatch } from '../utility/appStore'

import {
  searchStart,
  searchSuccess,
  searchFailure,
} from '../utility/aiSearchSlice'

import { fetchMovieOverview } from '../utility/aiSearchService'
import { searchMovieTMDB } from '../utility/tmdbService'

const DEFAULT_AVATAR =
  'https://cdn-icons-png.flaticon.com/512/149/149071.png'

const Header = (): ReactElement => {
  const navigate = useNavigate()
  const user = useSelector((store: RootState) => store.user)
  const dispatch = useDispatch<AppDispatch>()

  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  /* ---------- AUTH ---------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        const { uid, email, displayName, photoURL } = firebaseUser
        dispatch(addUser({ uid, email, displayName, photoURL }))
        navigate('/Home')
      } else {
        dispatch(removeUser())
        navigate('/')
      }
    })
    return () => unsubscribe()
  }, [dispatch, navigate])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch {
      navigate('/Error')
    }
  }

  /* ---------- SEARCH ---------- */
  const handleSearch = async (): Promise<void> => {
    if (!query.trim() || loading) return

    try {
      setLoading(true)
      dispatch(searchStart(query))

      const tmdb = await searchMovieTMDB(query)
      const overview = await fetchMovieOverview(query)

      const result = {
        title: tmdb?.original_title || query,
        overview,
        rating: tmdb?.vote_average
          ? tmdb.vote_average.toFixed(1)
          : 'N/A',
        runtime: 'N/A',
        release_date: tmdb?.release_date || 'N/A',
        genres: [],
        poster: tmdb?.poster_path
          ? `https://image.tmdb.org/t/p/original${tmdb.poster_path}`
          : '',
      }

      dispatch(searchSuccess(result))
    } catch (error: any) {
      dispatch(searchFailure(error.message))
    } finally {
      setTimeout(() => setLoading(false), 250)
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/80 to-transparent px-4 py-3 sm:px-6 md:px-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto gap-4">

          {/* LOGO */}
          <div className="w-28 sm:w-32 md:w-36 lg:w-44">
            <StreamAiLogo className="w-full h-auto" />
          </div>

          {/* 🔍 SEARCH (ONLY WHEN LOGGED IN) */}
          {user && (
            <div className="flex-1 max-w-xl hidden sm:flex items-center gap-2">
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-black/70 text-white border border-gray-600 rounded-md outline-none focus:border-red-500"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                {loading ? '...' : 'Search'}
              </button>
            </div>
          )}

          {/* 📱 MOBILE SEARCH ICON */}
          {user && (
            <div className="sm:hidden">
              <button
                onClick={() => setShowMobileSearch(true)}
                className="text-white text-xl"
              >
                🔍
              </button>
            </div>
          )}

          {/* USER */}
          {user && (
            <div className="flex items-center gap-3">
              <img
                className="w-9 h-9 rounded-full object-cover"
                src={user.photoURL || DEFAULT_AVATAR}
                alt="user"
              />
              <button
                onClick={handleSignOut}
                className="text-white hover:text-gray-300"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 📱 MOBILE SEARCH OVERLAY */}
      {user && showMobileSearch && (
        <div className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center px-4">
          <div className="w-full max-w-md flex gap-2">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-md outline-none focus:ring-2 focus:ring-red-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                  setShowMobileSearch(false)
                }
              }}
            />
            <button
              onClick={() => {
                handleSearch()
                setShowMobileSearch(false)
              }}
              className="px-4 py-3 bg-red-600 text-white rounded-md"
            >
              Go
            </button>
          </div>

          <button
            onClick={() => setShowMobileSearch(false)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}

export default Header