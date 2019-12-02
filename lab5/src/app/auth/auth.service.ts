import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, first, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dbPath = '/users';
  user$: Observable<User>; //Observable variable to hold an observable of user information from database
  user: User; //Variable that holds a User model
  display: string; //Variable to store the display name of the current user
  newUser: any; //Variable to store temporary information for a new user registering
  usersRef: AngularFirestoreCollection<User> = null; //Reference for users as an AngularFirestoreCollection of User models

  private eventAuthError = new BehaviorSubject<string>(""); //Holds auth error messages
  eventAuthError$ = this.eventAuthError.asObservable(); //Observable variable that holds auth error messages

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //Set the observable user to a valueChanges observable of a specific user using the uid
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

  getUsers() { //Retrieve all users in database (for admin)
    this.usersRef = this.afs.collection(this.dbPath);
    return this.usersRef;
  }

  //Async function to launch Google's sign in pop-up and then update user credentials in database
  async googleSignin() { 
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user).then(() => {
      this.router.navigate(['/home']);
    });
  }

  //Async function to login with Firebase auth and check if account is currently active, if not redirect to contact page
  async login(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredentials => {
        console.log(userCredentials);
        if(userCredentials) {
          if (!userCredentials.user.emailVerified) {
            this.SendVerificationEmail();
            this.signOut();
          }
          else {
            this.afs.doc(`users/${userCredentials.user.uid}`).ref.get().then((doc) => {
              let data = doc.data();
              if (data.active) this.router.navigate(['/home']);
              else {
                this.afAuth.auth.signOut().then(nav => {
                  this.router.navigate(['/contact']);
                }       
                );
                
              }
            })
          }          
        }
      })
  }

  //Function to sign out of Firebase
  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/home']);
  }

  //Function to update user information, depending on if it is a new user or not
  async updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    let data: any;
    await userRef.ref.get().then((doc) => {
      if (doc.exists) {
        data = doc.data();
      }
      else {
        data = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'authenticated user',
          active: true,
          emailVerified: user.emailVerified
        }
      }
    })
    console.log(data);
    return userRef.set(data, { merge: true });

  }

  //Function to create a new user in Firebase with an Email and a Password and log them in
  async createUser(user) {
    await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then( userCredential => {
      this.SendVerificationEmail();
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

  SendVerificationEmail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['/login']);
    })
  }

  //Function to toggle user enable/disable
  toggleActive(user: User) {
    user.active = !user.active;
    this.updateUserData(user);
  }

  //Function to insert user information (used for new users to set the role and photoURL)
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.afs.doc(`users/${userCredential.user.uid}`).set({
      uid: userCredential.user.uid,
      email: this.newUser.email,
      active: true,
      role: 'authenticated user',
      displayName: this.newUser.firstName + ' ' + this.newUser.lastName,
      photoURL: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
      emailVerified: false
    })
  }
}
