// import { inject } from '@angular/core';
// import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { map } from 'rxjs/operators';
// import { UserauthService } from '../services/userauth.service';

// export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   const router: Router = inject(Router);
//   const authService = inject(UserauthService);

//   return authService.getUserProfile().pipe(
//     map(userObject => {
//       if (userObject && userObject.id) {
//         return true;
//       } else {
//         router.navigate(['/login']);
//         return false;
//       }
//     })
//   );
// };


import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const accessToken = localStorage.getItem('access_token'); // Check access token from localStorage

  if (accessToken) {
    return true; // Allow navigation if access token exists
  } else {
    router.navigate(['/login']); // Redirect to login if access token doesn't exist
    return false;
  }
};
