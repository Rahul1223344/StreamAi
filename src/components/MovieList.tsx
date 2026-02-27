import { type ReactElement } from 'react'
import MovieCard from './MovieCard'
import type { Movie } from '../utility/moviesSlice'

interface MovieListProps {
  title: string
  movies: Movie[] | null
}

const MovieList = ({ title, movies }: MovieListProps): ReactElement | null => {
  if (!movies || movies.length === 0) return null

  return (
    <div className="px-4 sm:px-6 py-1">
      <div className="inline-block relative">
        {/* title mask */}
        <div
          className="absolute inset-0 px-5 -py-1 bg-black/60 
                    rounded-md"
        />

        <h2
          className="
            relative text-white font-bold
            text-lg sm:text-xl md:text-3xl
            pl-1 sm:pl-3 md:pl-4 
          "
        >
          {title}
        </h2>
      </div>

      <div className="flex gap-3 py-3 overflow-x-scroll no-scrollbar">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieList