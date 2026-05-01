import { useEffect, type ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../utility/appStore'
import { closeModal } from '../utility/aiSearchSlice'

const AISearchModal = (): ReactElement | null => {
  const dispatch = useDispatch<AppDispatch>()
  const { result, isOpen, loading, error } = useSelector(
    (store: RootState) => store.aiSearch
  )

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md overflow-y-auto animate-modalIn"
      onClick={() => dispatch(closeModal())}
    >
      <div
        className="relative max-w-6xl mx-auto px-6 md:px-12 py-24 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={() => dispatch(closeModal())}
          className="fixed top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-red-600 transition"
        >
          ✕
        </button>

        {/* POSTER */}
        {result?.poster && (
          <div className="absolute inset-0 -z-10">
            <img
              src={result.poster}
              className="w-full h-full object-cover scale-125 blur-md opacity-40"
            />
          </div>
        )}

        {/* ✨ SHIMMER LOADING */}
        {loading && (
          <div className="space-y-5 max-w-3xl">
            <div className="h-12 w-2/3 shimmer" />
            <div className="flex gap-3">
              <div className="h-4 w-16 shimmer" />
              <div className="h-4 w-20 shimmer" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full shimmer" />
              <div className="h-4 w-full shimmer" />
              <div className="h-4 w-5/6 shimmer" />
            </div>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {result && !loading && (
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-extrabold">
              {result.title}
            </h1>

            <div className="flex gap-4 text-gray-300">
              <span>⭐ {result.rating}</span>
              <span>📅 {result.release_date}</span>
            </div>

            <div className="max-h-[60vh] overflow-y-auto custom-scroll">
              <p className="text-gray-200 leading-[1.8] text-lg">
                {result.overview}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AISearchModal