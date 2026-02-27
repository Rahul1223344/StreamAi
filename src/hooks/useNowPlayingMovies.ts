import { useEffect } from 'react'
import { options } from '../utility/constant'
import { addNowPlayingMovies, type Movie } from '../utility/moviesSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../utility/appStore'

interface TMDBNowPlayingResponse {
  results: Movie[]
}

const useNowPlayingMovies = (): void => {
  const dispatch = useDispatch<AppDispatch>()

  const nowPlayingData = useSelector(
    (store: RootState) => store.movies.nowPlayingMovies
  )

  const getNowPlayingMovies = async (): Promise<void> => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
      options
    )

    const json: TMDBNowPlayingResponse = await data.json()
    dispatch(addNowPlayingMovies(json.results))
  }

  useEffect(() => {
    if (!nowPlayingData) {
      getNowPlayingMovies()
    }
  }, [nowPlayingData])
}

export default useNowPlayingMovies