// import { Component, Input, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// import { Actor } from '../interface/actor.interface';
// import { environment } from '../../environments/environment.development';

// @Component({
//   selector: 'app-actor-details',
//   templateUrl: './actor-details.component.html',
//   styleUrls: ['./actor-details.component.scss']
// })
// export class ActorDetailsComponent implements OnInit {
//   @Input() actorName!: string;
//   actor$: Observable<Actor | null> = of(null);

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     const headers = new HttpHeaders({
//       'X-Api-Key': environment.apiKey_Actor
//     });

//     this.actor$ = this.http.get<Actor[]>(`${environment.apiEndPoint_Actor}/celebrity?name=${this.actorName}`, { headers }).pipe(
//       map(actors => actors.length > 0 ? actors[0] : null),
//       catchError(() => of(null)) // Handle errors gracefully
//     );
//   }
// }
// src/app/components/actor-details/actor-details.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Actor } from '../interface/actor.interface';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.scss']
})
export class ActorDetailsComponent implements OnInit {
  @Input() actorName!: string;
  actor$: Observable<Actor> = of(); // Initialize actor$ with an empty Observable

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'X-Api-Key': environment.apiKey_Actor
    });

    // this.actor$ = this.http.get<Actor[]>(`${environment.apiEndPoint_Actor}/v1/celebrity?name=${this.actorName}`, { headers }).pipe(
    //   map(actors => actors[0])
    // );
    this.actor$ = this.http.get<Actor[]>(`${environment.apiUrl}/api/celebrity?name=${this.actorName}`, { headers }).pipe(
      map(actors => actors[0])
    );
  }
}
