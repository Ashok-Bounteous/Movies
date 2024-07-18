// import { createReducer, on } from '@ngrx/store';
// import { loadMoviesSuccess, loadMoviesFailure, searchMovieSuccess, searchMovieFailure, selectMovie } from './movie.actions';
// import { MovieState } from './movie.state';

// const initialState: MovieState = {
//   movies: [],
//   selectedMovie: null,
//   error: null,
// };

// export const movieReducer = createReducer(
//   initialState,
//   on(loadMoviesSuccess, (state, { movies }) => ({ ...state, movies, error: null })),
//   on(loadMoviesFailure, (state, { error }) => ({ ...state, error })),
//   on(searchMovieSuccess, (state, { movie }) => ({ ...state, selectedMovie: movie, error: null })),
//   on(searchMovieFailure, (state, { error }) => ({ ...state, error })),
//   on(selectMovie, (state, { movie }) => ({ ...state, selectedMovie: movie }))
// );
import { createReducer, on } from '@ngrx/store';
import { loadMoviesSuccess, loadMoviesFailure, searchMovieSuccess, searchMovieFailure, loadUserMoviesSuccess, loadUserMoviesFailure, selectMovie } from './movie.actions';
import { MovieState } from './movie.state';
import { selectAllMovies } from './movie.selectors';

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  error: null,
};

export const movieReducer = createReducer(
  initialState,
  on(loadMoviesSuccess, (state, { movies }) => ({ ...state, movies, error: null })),
  on(loadMoviesFailure, (state, { error }) => ({ ...state, error })),
  on(searchMovieSuccess, (state, { movie }) => ({ ...state, selectedMovie: movie, error: null })),
  on(searchMovieFailure, (state, { error }) => ({ ...state, error })),
  on(loadUserMoviesSuccess, (state, { movies }) => ({ ...state, movies, error: null })),
  on(loadUserMoviesFailure, (state, { error }) => ({ ...state, error })),
  on(selectMovie, (state, { movie }) => ({ ...state, selectedMovie:movie, error: null }))
);
