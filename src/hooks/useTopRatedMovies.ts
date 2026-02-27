import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { options } from '../utility/constant'
import { addTopRatedMovie, type Movie } from '../utility/moviesSlice'
import type { RootState, AppDispatch } from '../utility/appStore'

interface TMDBTopRatedResponse {
  results: Movie[]
}

const useTopRatedMovies = (): void => {
  const dispatch = useDispatch<AppDispatch>()

  const topRatedMovieData = useSelector(
    (store: RootState) => store.movies.topRatedMovie
  )

  useEffect(() => {
    const getTopRatedMovies = async (): Promise<void> => {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        options
      )

      const json: TMDBTopRatedResponse = await data.json()
      dispatch(addTopRatedMovie(json.results))
    }

    if (!topRatedMovieData) {
      getTopRatedMovies()
    }
  }, [topRatedMovieData, dispatch])
}

export default useTopRatedMovies