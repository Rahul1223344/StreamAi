import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import type { RootState } from "../utility/appStore"
import type { ReactElement } from "react"


const PublicRoute = ({ children }: { children:  ReactElement }) => {
  const user = useSelector((store: RootState) => store.user)

  // If already logged in → go to home
  if (user.uid) {
    return <Navigate to="/home" />
  }

  return children
}

export default PublicRoute