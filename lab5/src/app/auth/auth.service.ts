import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, first, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  display: string;
  newUser: any;

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log(user.uid, user.email);
          this.display = user.displayName;
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  get currentUserObservable(): any {
    return this.afAuth.auth
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user).then(() => {
      this.router.navigate(['/home']);
    });
  }

  async login(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredentials => {
        if(userCredentials) {
          this.router.navigate(['/home']);
        }
      })
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/home']);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'authenticated user',
      active: true
    }

    return userRef.set(data, { merge: true });

  }

  async createUser(user) {
    await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then( userCredential => {
      this.newUser = user;
      console.log(userCredential);
      userCredential.user.updateProfile( {
        displayName: user.firstName + ' ' + user.lastName,
        photoURL: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
      });

      this.insertUserData(userCredential)
      .then(() => {
        this.router.navigate(['/']);
      })
    })
    .catch( error => {
      console.log(error);
      this.eventAuthError.next(error);
    })
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.afs.doc(`users/${userCredential.user.uid}`).set({
      uid: userCredential.user.uid,
      email: this.newUser.email,
      active: true,
      role: 'authenticated user',
      displayName: this.newUser.firstName + ' ' + this.newUser.lastName,
      photoURL: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    })
  }
}
