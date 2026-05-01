import { useState, type ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../utility/appStore'
import {
  searchStart,
  searchSuccess,
  searchFailure,
} from '../utility/aiSearchSlice'
import { fetchMovieFromAI } from '../utility/aiSearchService'

const SearchBar = (): ReactElement => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const handleSearch = async (): Promise<void> => {
    if (!query.trim()) return

    try {
      setLoading(true)
      dispatch(searchStart(query))

      const data = await fetchMovieFromAI(query)

      dispatch(searchSuccess(data))
    } catch (error: any) {
      dispatch(searchFailure(error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex justify-center mt-20 px-4">
      <div className="w-full max-w-2xl flex gap-2">
        <input
          type="text"
          placeholder="Search any movie with AI..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            flex-1 p-3 rounded-md
            bg-gray-800 text-white
            outline-none border border-gray-700
            focus:border-red-500
          "
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
        />

        <button
          onClick={handleSearch}
          className="
            px-5 py-3 bg-red-600
            text-white rounded-md
            hover:bg-red-700
            transition
          "
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  )
}

export default SearchBar