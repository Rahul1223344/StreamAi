import { useEffect, useState, type ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { options } from '../utility/constant'

interface Genre {
  id: number
  name: string
}

interface MovieDetailsData {
  id: number
  original_title: string
  overview: string
  backdrop_path: string | null
  poster_path: string | null
  release_date: string
  vote_average: number
  runtime: number
  genres: Genre[]
}

interface TMDBVideo {
  key: string
  type: string
}

interface TMDBVideosResponse {
  results: TMDBVideo[]
}

const MovieDetails = (): ReactElement => {
  const { id } = useParams<{ id: string }>()

  const [movie, setMovie] = useState<MovieDetailsData | null>(null)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchMovieDetails = async (): Promise<void> => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options
      )
      const json: MovieDetailsData = await data.json()
      setMovie(json)
    }

    const fetchMovieTrailer = async (): Promise<void> => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        options
      )
      const json: TMDBVideosResponse = await data.json()

      const trailer =
        json.results.find((v) => v.type === 'Trailer') || json.results[0]

      setTrailerKey(trailer?.key || null)
    }

    fetchMovieDetails()
    fetchMovieTrailer()
  }, [id])

  /* ---------- Loading State ---------- */
  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p className="text-lg animate-pulse">Loading movie details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section (Trailer or Backdrop) */}
      <div className="relative h-[60vh] w-full">
        {trailerKey ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=1&playsinline=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Trailer"
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            className="w-full h-full object-cover"
            alt={movie.original_title}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="px-6 md:px-12 py-8 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {movie.original_title}
        </h1>

        <p className="text-gray-300 mb-6 leading-relaxed">
          {movie.overview}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-400">
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span>⏱ {movie.runtime} mins</span>
          <span>📅 {movie.release_date}</span>
          <span>
            🎭 {movie.genres.map((g) => g.name).join(', ')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails