import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import appStore from './utility/appStore'
import { Provider } from 'react-redux'
import type { ReactElement } from 'react'
import MovieDetails from './pages/MoviesDetails'
import ProtectedRoute from './components/ProtectedRoute'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/home',
    element: <ProtectedRoute>
              <Home />
            </ProtectedRoute>,
  },
  { path: '/movie/:id',
    element:<ProtectedRoute> 
              <MovieDetails /> 
           </ProtectedRoute>
  },
])

function App(): ReactElement {
  return (
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
