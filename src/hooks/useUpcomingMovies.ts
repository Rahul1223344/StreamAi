import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { options } from '../utility/constant'
import { addUpcomingMovies, type Movie } from '../utility/moviesSlice'
import type { RootState, AppDispatch } from '../utility/appStore'

interface TMDBUpcomingResponse {
  results: Movie[]
}

const useUpcomingMovies = (): void => {
  const dispatch = useDispatch<AppDispatch>()

  const upcomingMoviesData = useSelector(
    (store: RootState) => store.movies.upcomingMovie
  )

  useEffect(() => {
    const getUpcomingMovies = async (): Promise<void> => {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
        options
      )

      const json: TMDBUpcomingResponse = await data.json()
      dispatch(addUpcomingMovies(json.results))
    }

    if (!upcomingMoviesData) {
      getUpcomingMovies()
    }
  }, [upcomingMoviesData, dispatch])
}

export default useUpcomingMovies