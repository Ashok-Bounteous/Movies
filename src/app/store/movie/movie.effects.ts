// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { HttpClient } from '@angular/common/http';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { loadMovies, loadMoviesSuccess, loadMoviesFailure, searchMovie, searchMovieSuccess, searchMovieFailure } from './movie.actions';
// import { Movie } from './movie.model';
// import { environment } from '../../../environments/environment.development';
// import { landingMovies } from '../../data/landingMovies';

// @Injectable()
// export class MovieEffects {
//   constructor(private actions$: Actions, private http: HttpClient) {}

//   loadMovies$ = createEffect(() =>
//   //   this.actions$.pipe(
//   //     ofType(loadMovies),
//   //     mergeMap(() =>
//   //       this.http.get<Movie[]>(landingMovies).pipe(
//   //         map(movies => loadMoviesSuccess({ movies })),
//   //         catchError(error => of(loadMoviesFailure({ error })))
//   //       )
//   //     )
//   //   )
//   // );
//   this.actions$.pipe(
//     ofType(loadMovies),
//     mergeMap(() =>
//       of(landingMovies).pipe(
//         map(movies => loadMoviesSuccess({ movies })),
//         catchError(error => of(loadMoviesFailure({ error })))
//       )
//     )
//   )
// );


//   searchMovie$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(searchMovie),
//       mergeMap(action =>
//         this.http.get<Movie>(`https://www.omdbapi.com/?t=${action.title}&apikey=${environment.apiKey_Movie}`).pipe(
//           map(movie => searchMovieSuccess({ movie })),
//           catchError(error => of(searchMovieFailure({ error })))
//         )
//       )
//     )
//   );
// }
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadMovies, loadMoviesSuccess, loadMoviesFailure, searchMovie, searchMovieSuccess, searchMovieFailure, loadUserMovies, loadUserMoviesSuccess, loadUserMoviesFailure } from './movie.actions';
import { Movie } from './movie.model';
import { environment } from '../../../environments/environment.development';
import { landingMovies } from '../../data/landingMovies';

@Injectable()
export class MovieEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovies),
      mergeMap(() =>
        of(landingMovies).pipe(
          map(movies => loadMoviesSuccess({ movies })),
          catchError(error => of(loadMoviesFailure({ error })))
        )
      )
    )
  );

  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchMovie),
      mergeMap(action =>
        this.http.get<Movie>(`https://www.omdbapi.com/?t=${action.title}&apikey=${environment.apiKey_Movie}`).pipe(
          map(movie => searchMovieSuccess({ movie })),
          catchError(error => of(searchMovieFailure({ error })))
        )
      )
    )
  );

  loadUserMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserMovies),
      mergeMap(action =>
        this.http.get<Movie[]>(`http://localhost:3000/api/user-movies?email=${action.email}`).pipe(
          map(movies => loadUserMoviesSuccess({ movies })),
          catchError(error => of(loadUserMoviesFailure({ error })))
        )
      )
    )
  );
}
