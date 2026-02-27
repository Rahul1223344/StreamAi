import { type ReactElement, type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '../utility/appStore'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactElement => {
  const user = useSelector((store: RootState) => store.user)

  if (!user) return <Navigate to="/" replace />

  return <>{children}</>
}

export default ProtectedRoute