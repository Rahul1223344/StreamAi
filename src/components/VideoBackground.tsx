import { type ReactElement } from 'react'
import { useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer'
import type { RootState } from '../utility/appStore'

interface VideoBackgroundProps {
  id: number
}

const VideoBackground = ({ id }: VideoBackgroundProps): ReactElement => {
  const trailerVedio = useSelector(
    (store: RootState) => store.movies.trailerVedio
  )

  useMovieTrailer(id)

  if (!trailerVedio) return <></>

  return (
    <div className="relative w-screen h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden bg-black">
      <iframe
        className="absolute inset-0 w-full h-full scale-125"
        src={`https://www.youtube.com/embed/${trailerVedio.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVedio.key}&playsinline=1`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        frameBorder="0"
        title="Trailer"
      />
    </div>
  )
}

export default VideoBackground