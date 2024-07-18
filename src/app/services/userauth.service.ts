// import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
// import { Inject, Injectable } from '@angular/core';
// import { Login, Signup } from '../interface/userauth';
// import { localStorageToken } from '../javascriptapis/localstorage.token';
// import { Observable, catchError, delay, of, switchMap, throwError } from 'rxjs';
// import { Router } from '@angular/router';
// import { environment } from '../../environments/environment.development';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserauthService {

//   constructor(
//     private http: HttpClient,
//     @Inject(localStorageToken) private storage: Storage,
//     private router: Router
//   ) { }

//   getAccessToken(): string | null {
//     return this.storage.getItem('access_token');
//   }

//   getRefreshToken(): string | null {
//     return this.storage.getItem('refresh_token');
//   }

//   refreshToken(): Observable<any> {
//     const refreshToken = this.getRefreshToken();
//     if (!refreshToken) {
//       this.router.navigate(['/login']);
//     }

//     return this.http.post(`${environment.apiEndPoint}/auth/refresh-token`, {
//       refreshToken,
//     });
//   }

//   saveTokens(accessToken: string, refreshToken: string): void {
//     this.storage.setItem('access_token', accessToken);
//     this.storage.setItem('refresh_token', refreshToken);
//   }

//   userLogin(loginDetails: Login): Observable<any> {
//     return this.http.post<any>(`${environment.apiEndPoint}/auth/login`, loginDetails);
//   }

//   userSignup(signupDetails: Signup): Observable<any> {
//     // return this.http.post<any>(`${environment.apiEndPoint}/auth/users`, signupDetails);
//     return this.http.post<any>(`${environment.apiEndPoint}/users`, signupDetails);
//   }

//   userLogout(): void {
//     this.storage.removeItem('access_token');
//     this.storage.removeItem('refresh_token');
//     this.router.navigate(["/login"]);
//   }

//   getUserProfile(): Observable<any> {
//     return this.http.get<any>(`${environment.apiEndPoint}/auth/profile`);
//   }

//   handle401Error(originalRequest: HttpRequest<any>): Observable<any> {
//     return this.refreshToken().pipe(
//       switchMap((tokens: any) => {
//         this.saveTokens(tokens.access_token, tokens.refresh_token);
//         const newRequest = originalRequest.clone({
//           setHeaders: {
//             Authorization: `Bearer ${tokens.access_token}`,
//           }
//         });
//         return this.http.request(newRequest);
//       }),
//       catchError(err => {
//         this.userLogout();
//         return throwError(err);
//       })
//     );
//   }
// }


import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Login, Signup } from '../interface/userauth';
import { localStorageToken } from '../javascriptapis/localstorage.token';
import { Observable, catchError, delay, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  constructor(
    private http: HttpClient,
    @Inject(localStorageToken) private storage: Storage,
    private router: Router
  ) { }

  getAccessToken(): string | null {
    return this.storage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return this.storage.getItem('refresh_token');
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.router.navigate(['/login']);
    }

    return this.http.post(`${environment.apiEndPoint}/auth/refresh-token`, {
      refreshToken,
    });
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    this.storage.setItem('access_token', accessToken);
    this.storage.setItem('refresh_token', refreshToken);
  }

  userLogin(loginDetails: Login): Observable<any> {
    console.log("Entered userLogin method!")
    return this.http.post<any>(`${environment.apiEndPoint}/auth/login`, loginDetails);
  }

  userSignup(signupDetails: Signup): Observable<any> {
    // return this.http.post<any>(`${environment.apiEndPoint}/auth/users`, signupDetails);
    return this.http.post<any>(`${environment.apiEndPoint}/users`, signupDetails);
  }

  userLogout(): void {
    this.storage.removeItem('access_token');
    this.storage.removeItem('refresh_token');
    this.storage.removeItem('user_email'); // Remove stored email
    this.router.navigate(["/login"]);
  }

  storeUserEmail(email: string): void {
    this.storage.setItem('user_email', email);
  }

  getUserEmail(): string | null {
    return this.storage.getItem('user_email');
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${environment.apiEndPoint}/auth/profile`);
  }

  handle401Error(originalRequest: HttpRequest<any>): Observable<any> {
    return this.refreshToken().pipe(
      switchMap((tokens: any) => {
        this.saveTokens(tokens.access_token, tokens.refresh_token);
        const newRequest = originalRequest.clone({
          setHeaders: {
            Authorization: `Bearer ${tokens.access_token}`,
          }
        });
        return this.http.request(newRequest);
      }),
      catchError(err => {
        this.userLogout();
        return throwError(err);
      })
    );
  }
}
