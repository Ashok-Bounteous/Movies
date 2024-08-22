// import { Component } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { Router } from '@angular/router';
// import { searchMovie, selectMovie } from '../../store/movie/movie.actions';
// import { Movie } from '../../store/movie/movie.model';
// import { AppState } from '../../store/global/app.state';
// import { selectSelectedMovie, selectMovieError } from '../../store/movie/movie.selectors';

// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.scss']
// })
// export class SearchComponent {
//   selectedMovie$: Observable<Movie | null>;
//   error$: Observable<any>;

//   constructor(private store: Store<AppState>, private router: Router) {
//     this.selectedMovie$ = this.store.select(selectSelectedMovie);
//     this.error$ = this.store.select(selectMovieError);
//   }

//   onSearch(title: string): void {
//     this.store.dispatch(searchMovie({ title }));
//   }

//   viewMovieDetails(movie: Movie): void {
//     this.store.dispatch(selectMovie({ movie }));
//     this.router.navigate(['/movie-details', movie.imdbID]);
//   }
// }
// src/app/components/search/search.component.ts
import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { searchMovie, selectMovie } from '../../store/movie/movie.actions';
import { Movie } from '../../store/movie/movie.model';
import { AppState } from '../../store/global/app.state';
import { selectSelectedMovie, selectMovieError } from '../../store/movie/movie.selectors';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { localStorageToken } from '../../javascriptapis/localstorage.token';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  [x: string]: any;
  selectedMovie$: Observable<Movie | null>;
  error$: Observable<any>;

  constructor(
    private store: Store<AppState>, 
    private http: HttpClient, 
    private route: Router,
    @Inject(localStorageToken) private storage: Storage) 
    {
    this.selectedMovie$ = this.store.select(selectSelectedMovie);
    this.error$ = this.store.select(selectMovieError);
    
  }

  onSearch(title: string): void {
    
    const userEmail = this.storage.getItem('user_email');
    this.store.dispatch(searchMovie({ title }));
    this.selectedMovie$.subscribe(movie => {
      let temMovie = {...movie,email: userEmail}
      if (movie) {
        this.http.post(`${environment.apiDbUrl}/userMovies`, temMovie )
          .subscribe();
      }
    });
  }

  onSelectMovie(movie: Movie): void {
    this.store.dispatch(selectMovie({ movie }));
    this.route.navigate(['movie-details']);
  }
}
