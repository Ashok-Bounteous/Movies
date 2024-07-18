import { Movie } from './movie.model';

export interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
  error: any;
}
