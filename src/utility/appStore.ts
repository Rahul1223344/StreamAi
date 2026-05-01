import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import moviesReducer from './moviesSlice'
import aiSearchReducer from './aiSearchSlice'

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    aiSearch: aiSearchReducer,
  },
})

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof appStore.getState>

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof appStore.dispatch

export default appStore