// import { createAction, props } from '@ngrx/store';
// import { Movie } from './movie.model';

// export const loadMovies = createAction('[Movie] Load Movies');
// export const loadMoviesSuccess = createAction('[Movie] Load Movies Success', props<{ movies: Movie[] }>());
// export const loadMoviesFailure = createAction('[Movie] Load Movies Failure', props<{ error: any }>());

// export const searchMovie = createAction('[Movie] Search Movie', props<{ title: string }>());
// export const searchMovieSuccess = createAction('[Movie] Search Movie Success', props<{ movie: Movie }>());
// export const searchMovieFailure = createAction('[Movie] Search Movie Failure', props<{ error: any }>());
// export const selectMovie = createAction(
//   '[Movie] Select Movie',
//   props<{ movie: Movie }>()
// );


import { createAction, props } from '@ngrx/store';
import { Movie } from './movie.model';

export const loadMovies = createAction('[Movie] Load Movies');
export const loadMoviesSuccess = createAction('[Movie] Load Movies Success', props<{ movies: Movie[] }>());
export const loadMoviesFailure = createAction('[Movie] Load Movies Failure', props<{ error: any }>());

export const searchMovie = createAction('[Movie] Search Movie', props<{ title: string }>());
export const searchMovieSuccess = createAction('[Movie] Search Movie Success', props<{ movie: Movie }>());
export const searchMovieFailure = createAction('[Movie] Search Movie Failure', props<{ error: any }>());
export const selectMovie = createAction(
  '[Movie] Select Movie',
  props<{ movie: Movie }>()
);

export const loadUserMovies = createAction('[Movie] Load User Movies', props<{ email: string }>());
export const loadUserMoviesSuccess = createAction('[Movie] Load User Movies Success', props<{ movies: Movie[] }>());
export const loadUserMoviesFailure = createAction('[Movie] Load User Movies Failure', props<{ error: any }>());
