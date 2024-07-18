// import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { Movie } from '../../store/movie/movie.model';
// import { AppState } from '../../store/global/app.state';
// import { selectSelectedMovie } from '../../store/movie/movie.selectors';

// @Component({
//   selector: 'app-movie-details',
//   templateUrl: './movie-details.component.html',
//   styleUrls: ['./movie-details.component.scss']
// })
// export class MovieDetailsComponent implements OnInit {
//   movie$: Observable<Movie | null>;

//   constructor(private store: Store<AppState>) {
//     this.movie$ = this.store.select(selectSelectedMovie);
//   }

//   ngOnInit(): void {}
// }
// src/app/components/movie-details/movie-details.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../store/movie/movie.model';
import { AppState } from '../../store/global/app.state';
import { selectSelectedMovie } from '../../store/movie/movie.selectors';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie$: Observable<Movie | null>;

  constructor(private store: Store<AppState>, private location: Location) {
    this.movie$ = this.store.select(selectSelectedMovie);
  }

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}
