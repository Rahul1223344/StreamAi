import { type ReactElement } from 'react'
import { IMG_CDN_URL } from '../utility/constant'

interface MovieCardProps {
  posterPath?: string
}

const MovieCard = ({ posterPath }: MovieCardProps): ReactElement => {
  if (!posterPath) {
    return <div className="shrink-0" />
  }

  return (
    <div className="w-48 shrink-0">
      <img
        className="w-full block"
        src={IMG_CDN_URL + posterPath}
        alt="Movie card"
      />
    </div>
  )
}

export default MovieCard