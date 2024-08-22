// // src/app/components/past-searches/past-searches.component.ts
// import { Component, Inject, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { Movie } from '../../store/movie/movie.model';
// import { AppState } from '../../store/global/app.state';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment.development';
// import { selectMovie } from '../../store/movie/movie.actions';
// import { localStorageToken } from '../../javascriptapis/localstorage.token';


// @Component({
//   selector: 'app-past-searches',
//   templateUrl: './past-searches.component.html',
//   styleUrls: ['./past-searches.component.scss']
// })
// export class PastSearchesComponent implements OnInit {
//   pastSearches$!: Observable<Movie[]>;

//   constructor(
//     private store: Store<AppState>, 
//     private http: HttpClient,
//     @Inject(localStorageToken) private storage: Storage
//   ) {}

//   ngOnInit(): void {
//     this.http.get<Movie[]>(`${environment.apiUrl}/api/user-movies?email=${this.storage.getItem('user_email')}`)
//       .subscribe(movies => this.pastSearches$ = new Observable(subscriber => subscriber.next(movies)));
//   }

//   onSelectMovie(movie: Movie): void {
//     this.store.dispatch(selectMovie({ movie }));
//   }
// }
import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie } from '../../store/movie/movie.model';
import { AppState } from '../../store/global/app.state';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { selectMovie } from '../../store/movie/movie.actions';
import { localStorageToken } from '../../javascriptapis/localstorage.token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-past-searches',
  templateUrl: './past-searches.component.html',
  styleUrls: ['./past-searches.component.scss']
})
export class PastSearchesComponent implements OnInit {
  pastSearches$!: Observable<Movie[]>;

  constructor(
    private store: Store<AppState>, 
    private http: HttpClient,
    private route: Router,
    @Inject(localStorageToken) private storage: Storage
  ) {}

  ngOnInit(): void {
    const userEmail = this.storage.getItem('user_email');
    this.pastSearches$ = this.http.get<Movie[]>(`${environment.apiDbUrl}/userMovies`)
      .pipe(
        map(movies => movies.filter(movie => movie.email && movie.email === userEmail)),//abc@gmail.com
        catchError(err => {
          console.error('Error fetching user movies:', err);
          return throwError(err);
        })
      );
  }

  onSelectMovie(movie: Movie): void {
    this.store.dispatch(selectMovie({ movie }));
    this.route.navigate(['movie-details']);
  }
}
