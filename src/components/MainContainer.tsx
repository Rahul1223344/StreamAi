import { type ReactElement } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../utility/appStore'
import VedioBackground from './VideoBackground'
import VedioTitle from './VideoTitle'

interface Movie {
  id: number
  original_title: string
  overview: string
}

const MainContainer = (): ReactElement | null => {
  const movies = useSelector(
    (store: RootState) => store.movies?.nowPlayingMovies
  ) as Movie[] | undefined

  if (!movies || movies.length === 0) return null

  const { id, original_title, overview } = movies[0]

  return (
    <div
      className="
        relative bg-black min-h-[70vh] sm:min-h-[80vh] md:min-h-screen
        overflow-hidden
      "
    >
      <VedioBackground id={id} />
      <VedioTitle title={original_title} overview={overview} id={id} />
    </div>
  )
}

export default MainContainer