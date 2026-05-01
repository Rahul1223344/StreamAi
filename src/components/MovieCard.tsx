import { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { IMG_CDN_URL } from '../utility/constant'

interface MovieCardProps {
  id: number
  posterPath?: string
}

const MovieCard = ({ id, posterPath }: MovieCardProps): ReactElement => {
  const navigate = useNavigate()

  if (!posterPath) return <div className="shrink-0" />

  const handleClick = (): void => {
    navigate(`/movie/${id}`)
  }

  return (
    <div
      className="w-48 shrink-0 cursor-pointer"
      onClick={handleClick}
    >
      <img
        className="w-full block rounded-md hover:scale-105 transition-transform"
        src={IMG_CDN_URL + posterPath}
        alt="Movie card"
      />
    </div>
  )
}

export default MovieCard