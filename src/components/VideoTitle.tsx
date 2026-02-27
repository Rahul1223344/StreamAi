import { type ReactElement } from 'react'
import { useSelector } from 'react-redux'
import useMovieLogo from '../hooks/useMovieLogo'
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import type { RootState } from '../utility/appStore'

interface VedioTitleProps {
  title: string
  overview: string
  id: number
}

interface MovieLogo {
  file_path: string
}

const VideoTitle = ({ title, overview, id }: VedioTitleProps): ReactElement => {
  useMovieLogo(id)

  const logo = useSelector(
    (store: RootState) => store.movies.movieLogo
  ) as MovieLogo | null

  return (
    <div
      className="
        absolute z-20
        bottom-6 sm:bottom-10 md:top-1/4
        px-4 sm:px-6 md:px-12
        max-w-xl
        text-white
      "
    >
      {/* LOGO / TITLE */}
      {logo ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${logo.file_path}`}
          className="w-40 sm:w-48 md:w-52 lg:w-56 mb-3"
          alt={title}
        />
      ) : (
        <h1
          className="
            text-2xl sm:text-3xl md:text-3xl lg:text-4xl
            font-extrabold mb-3
          "
        >
          {title}
        </h1>
      )}

      {/* OVERVIEW */}
      <p
        className="
          text-sm sm:text-base
          text-gray-200
          line-clamp-3
          max-w-md
        "
      >
        {overview}
      </p>

      {/* BUTTONS */}
      <div className="mt-4 flex gap-3">
        <button
          className="
            flex items-center gap-2
            bg-white text-black
            px-5 py-2
            text-sm font-semibold
            rounded-md
          "
        >
          <PlayIcon className="w-5 h-5" />
          Play
        </button>

        <button
          className="
            flex items-center gap-2
            bg-gray-700/80 text-white
            px-5 py-2
            text-sm font-semibold
            rounded-md
          "
        >
          <InformationCircleIcon className="w-5 h-5" />
          More Info
        </button>
      </div>
    </div>
  )
}

export default VideoTitle