import { Movie } from '../movie/movie.model';

export interface AppStateModel {
  movies: {
    movies: Movie[];
    selectedMovie: Movie | null;
    error: any;
  };
}
