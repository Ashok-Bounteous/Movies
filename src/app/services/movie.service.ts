import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://www.omdbapi.com/';
  private apiKey = 'b9c6c1c8'; // Replace with your OMDb API key

  constructor(private http: HttpClient) { }

  searchMovies(title: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?t=${title}&apikey=${this.apiKey}`);
  }

  getMovieDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?i=${id}&apikey=${this.apiKey}`);
  }
}
