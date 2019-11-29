import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SongDetailsComponent } from './songs/song-details/song-details.component';
import { SongListComponent } from './songs/song-list/song-list.component';
import { CreateSongComponent } from './songs/create-song/create-song.component';
import { LoginFormComponent } from './users/login-form/login-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details', component: SongDetailsComponent},
  { path: 'songs', component: SongListComponent},
  { path: 'create', component: CreateSongComponent},
  { path: 'login', component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
