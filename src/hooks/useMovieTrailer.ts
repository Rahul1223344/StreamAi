import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { options } from '../utility/constant'
import { addNowPlayingTrailer } from '../utility/moviesSlice'
import type { RootState, AppDispatch } from '../utility/appStore'

interface TMDBVideo {
  key: string
  type: string
  name?: string
}

interface TMDBVideosResponse {
  results: TMDBVideo[]
}

const useMovieTrailer = (id: number | null | undefined): void => {
  const dispatch = useDispatch<AppDispatch>()
  const trailerData = useSelector(
    (store: RootState) => store.movies.trailerVedio
  )

  const getMovieVedio = async (): Promise<void> => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )

    const json: TMDBVideosResponse = await data.json()

    const filteredData = json.results.filter(
      (video) => video.type === 'Trailer'
    )

    const trailer: TMDBVideo | null =
      filteredData.length > 0 ? filteredData[0] : json.results[0] || null

    dispatch(addNowPlayingTrailer(trailer))
  }

  useEffect(() => {
    if (!trailerData && id) {
      getMovieVedio()
    }
  }, [id, trailerData])
}

export default useMovieTrailer