import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* ---------- Entity Types ---------- */
export interface Movie {
  id: number
  original_title: string
  overview: string
  backdrop_path?: string
  poster_path?: string
}

export interface TrailerVideo {
  key: string
  name?: string
}

export interface MovieLogo {
  file_path: string
}

/* ---------- Slice State ---------- */
interface MoviesState {
  nowPlayingMovies: Movie[] | null
  popularMovies: Movie[] | null
  trailerVedio: TrailerVideo | null
  movieLogo: MovieLogo | null
  upcomingMovie: Movie[] | null
  topRatedMovie: Movie[] | null
}

/* ---------- Initial State ---------- */
const initialState: MoviesState = {
  nowPlayingMovies: null,
  popularMovies: null,
  trailerVedio: null,
  movieLogo: null,
  upcomingMovie: null,
  topRatedMovie: null,
}

/* ---------- Slice ---------- */
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addNowPlayingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.nowPlayingMovies = action.payload
    },

    addNowPopularMovies: (state, action: PayloadAction<Movie[]>) => {
      state.popularMovies = action.payload
    },

    addUpcomingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.upcomingMovie = action.payload
    },

    addTopRatedMovie: (state, action: PayloadAction<Movie[]>) => {
      state.topRatedMovie = action.payload
    },

    addNowPlayingTrailer: (
      state,
      action: PayloadAction<TrailerVideo | null>
    ) => {
      state.trailerVedio = action.payload
    },

    addMovieLogo: (state, action: PayloadAction<MovieLogo | null>) => {
      state.movieLogo = action.payload
    },
  },
})

/* ---------- Exports ---------- */
export const {
  addNowPlayingMovies,
  addUpcomingMovies,
  addNowPlayingTrailer,
  addNowPopularMovies,
  addTopRatedMovie,
  addMovieLogo,
} = moviesSlice.actions

export default moviesSlice.reducer