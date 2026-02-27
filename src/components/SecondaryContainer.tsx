import { type ReactElement } from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'
import type { RootState } from '../utility/appStore'
import type { Movie } from '../utility/moviesSlice'

const SecondaryContainer = (): ReactElement => {
  const movies = useSelector((store: RootState) => store.movies)

  const trending: Movie[] =
    movies.nowPlayingMovies && movies.nowPlayingMovies.length > 0
      ? [...movies.nowPlayingMovies].reverse()
      : []

  return (
    <div className="bg-black">
      <div
        className="
          -mt-8 sm:-mt-12 md:-mt-28 lg:-mt-35
          relative z-40
          pb-8 sm:pb-12 md:pb-16
        "
      >
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MovieList title="Top Rated" movies={movies.topRatedMovie} />
        <MovieList title="Popular" movies={movies.popularMovies} />
        <MovieList title="Trending" movies={trending} />
        <MovieList title="Upcoming" movies={movies.upcomingMovie} />
      </div>
    </div>
  )
}

export default SecondaryContainer