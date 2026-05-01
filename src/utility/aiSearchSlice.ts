import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* ---------- TYPES ---------- */

export interface MovieAI {
  title: string
  overview: string
  rating: string
  runtime: string
  release_date: string
  genres: string[]
  poster?: string
}

interface AISearchState {
  query: string
  result: MovieAI | null
  loading: boolean
  error: string | null
  isOpen: boolean
}

/* ---------- INITIAL STATE ---------- */

const initialState: AISearchState = {
  query: '',
  result: null,
  loading: false,
  error: null,
  isOpen: false,
}

/* ---------- SLICE ---------- */

const aiSearchSlice = createSlice({
  name: 'aiSearch',
  initialState,
  reducers: {
    /* 🔍 START SEARCH */
    searchStart: (state, action: PayloadAction<string>) => {
      state.query = action.payload
      state.loading = true
      state.error = null

      // 🔥 IMPORTANT FIXES
      state.result = null       // clear previous data
      state.isOpen = true      // open modal immediately
    },

    /* ✅ SUCCESS */
    searchSuccess: (state, action: PayloadAction<MovieAI>) => {
      state.result = action.payload
      state.loading = false
    },

    /* ❌ FAILURE */
    searchFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },

    /* ❎ CLOSE MODAL */
    closeModal: (state) => {
      state.isOpen = false
      state.result = null
      state.query = ''
      state.error = null
      state.loading = false
    },
  },
})

/* ---------- EXPORTS ---------- */

export const {
  searchStart,
  searchSuccess,
  searchFailure,
  closeModal,
} = aiSearchSlice.actions

export default aiSearchSlice.reducer