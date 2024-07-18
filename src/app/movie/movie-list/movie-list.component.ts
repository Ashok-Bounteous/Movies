// src/app/components/movie-list/movie-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../store/movie/movie.model';
import { AppState } from '../../store/global/app.state';
import { loadMovies, selectMovie } from '../../store/movie/movie.actions';
import { selectAllMovies } from '../../store/movie/movie.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.movies$ = this.store.select(selectAllMovies);
  }

  ngOnInit(): void {
    this.store.dispatch(loadMovies());
  }

  onSelectMovie(movie: Movie): void {
    this.store.dispatch(selectMovie({ movie }));
    this.router.navigate(['/movie-details']);
  }
}
