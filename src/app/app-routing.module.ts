import { NgModule } from '@angular/core';
import { mapToCanActivate, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MoviesComponent } from './movies/movies.component';
import { TvComponent } from './tv/tv.component';
import { PeopleComponent } from './people/people.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "home",canActivate: [authGuard],component: HomeComponent },
  { path: "about",canActivate: [authGuard], component: AboutComponent },
  { path: "movies",canActivate: [authGuard], component: MoviesComponent },
  { path: "tv",canActivate: [authGuard], component: TvComponent },
  { path: "people", canActivate: [authGuard],component: PeopleComponent },
  { path: "moviedetails/:id/:media_type", canActivate: [authGuard],component: MoviedetailsComponent },



  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: '**', component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
