import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SongDetailsComponent } from './songs/song-details/song-details.component';
import { SongListComponent } from './songs/song-list/song-list.component';
import { CreateSongComponent } from './songs/create-song/create-song.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthGuard } from './auth/auth.guard';
import { LoggedInAuthGuard } from './auth/logged-in-auth.guard';
import { AdminAuthGuard } from './auth/admin-auth.guard';
import { UserListComponent } from './auth/user-list/user-list.component';
import { ContactComponent } from './admin/contact/contact.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'details', component: SongDetailsComponent, canActivate: [AdminAuthGuard]},
  { path: 'songs', component: SongListComponent},
  { path: 'create', component: CreateSongComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard]},
  { path: 'register', component: RegistrationComponent, canActivate: [LoggedInAuthGuard]},
  { path: 'users', component: UserListComponent, canActivate: [AdminAuthGuard]},
  { path: 'contact', component: ContactComponent, canActivate: [LoggedInAuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
