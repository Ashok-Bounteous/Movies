import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { SearchComponent } from './component/search/search.component';
import { PastSearchesComponent } from './component/past-searches/past-searches.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { LoginComponent } from './user-auth/login/login.component';
import { SignupComponent } from './user-auth/signup/signup.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'movie-list', component: MovieListComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'past-searches', component: PastSearchesComponent, canActivate: [AuthGuard] },
  { path: 'movie-details', component: MovieDetailsComponent },
  { path: '**', component: MovieListComponent, canActivate: [AuthGuard] } // Redirect unknown routes to movie-list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
