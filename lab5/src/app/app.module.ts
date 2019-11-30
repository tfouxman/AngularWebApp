import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SongInfoComponent } from './songs/song-info/song-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SongDetailsComponent } from './songs/song-details/song-details.component';
import { SongListComponent } from './songs/song-list/song-list.component';
import { CreateSongComponent } from './songs/create-song/create-song.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AdminComponent } from './admin/admin/admin.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ReviewComponent } from './songs/review/review.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SongDetailsComponent,
    SongListComponent,
    CreateSongComponent,
    AdminComponent,
    LoginComponent,
    RegistrationComponent,
    SongInfoComponent,
    ReviewComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    NgbModule
  ],
  entryComponents: [SongInfoComponent, ReviewComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
