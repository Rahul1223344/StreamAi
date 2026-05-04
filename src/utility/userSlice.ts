import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* ---------- TYPES ---------- */
interface UserState {
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
  isLoading: boolean
}

/* ---------- INITIAL STATE ---------- */
const initialState: UserState = {
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  isLoading: true, 
}

/* ---------- SLICE ---------- */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (
      state,
      action: PayloadAction<{
        uid: string
        email: string | null
        displayName: string | null
        photoURL: string | null
      }>
    ) => {
      state.uid = action.payload.uid
      state.email = action.payload.email
      state.displayName = action.payload.displayName
      state.photoURL = action.payload.photoURL
      state.isLoading = false
    },
    removeUser: (state) => {
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.isLoading = false
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})
export const { addUser, removeUser, setAuthLoading } = userSlice.actions
export default userSlice.reducer