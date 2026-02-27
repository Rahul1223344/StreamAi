import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { options } from '../utility/constant'
import { addNowPopularMovies, type Movie } from '../utility/moviesSlice'
import type { RootState, AppDispatch } from '../utility/appStore'

interface TMDBPopularResponse {
  results: Movie[]
}

const usePopularMovies = (): void => {
  const dispatch = useDispatch<AppDispatch>()

  const popularMovieData = useSelector(
    (store: RootState) => store.movies.popularMovies
  )

  useEffect(() => {
    const getPopularMovies = async (): Promise<void> => {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        options
      )

      const json: TMDBPopularResponse = await data.json()
      dispatch(addNowPopularMovies(json.results))
    }

    if (!popularMovieData) {
      getPopularMovies()
    }
  }, [popularMovieData, dispatch])
}

export default usePopularMovies