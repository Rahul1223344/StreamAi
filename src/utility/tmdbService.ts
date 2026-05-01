import { options } from './constant'

export const searchMovieTMDB = async (query: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  )

  const data = await res.json()

  return data?.results?.[0] // best match
}