import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { options } from '../utility/constant'
import { addMovieLogo } from '../utility/moviesSlice'
import type { RootState, AppDispatch } from '../utility/appStore'

interface TMDBLogo {
  file_path: string
}

interface TMDBLogoResponse {
  logos: TMDBLogo[]
}

const useMovieLogo = (id: number | null | undefined): void => {
  const dispatch = useDispatch<AppDispatch>()
  const logoData = useSelector((store: RootState) => store.movies.movieLogo)

  const getMovieLogo = async (): Promise<void> => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      options
    )
    const json: TMDBLogoResponse = await data.json()

    const pngLogo: TMDBLogo | null =
      json.logos?.find((logo) => logo.file_path.endsWith('.png')) || null

    dispatch(addMovieLogo(pngLogo))
  }

  useEffect(() => {
    if (!logoData && id) {
      getMovieLogo()
    }
  }, [id, logoData])
}

export default useMovieLogo