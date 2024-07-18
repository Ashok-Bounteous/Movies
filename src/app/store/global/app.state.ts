import { ActionReducerMap } from '@ngrx/store';
import { movieReducer } from '../movie/movie.reducer';
import { MovieState } from '../movie/movie.state';

export interface AppState {
  movies: MovieState;
}

export const appReducers: ActionReducerMap<AppState> = {
  movies: movieReducer,
};
