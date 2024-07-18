import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieState } from './movie.state';

export const selectMovieState = createFeatureSelector<MovieState>('movies');

export const selectAllMovies = createSelector(selectMovieState, (state: MovieState) => state.movies);
export const selectSelectedMovie = createSelector(selectMovieState, (state: MovieState) => state.selectedMovie);
export const selectMovieError = createSelector(selectMovieState, (state: MovieState) => state.error);
