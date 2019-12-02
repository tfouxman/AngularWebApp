import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Song } from './song';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  //Path to songs in database
  private dbPath = '/songs';

  //Reference for songs and reviews as an AngularFirestoreCollection from database
  songsRef: AngularFirestoreCollection<Song> = null;
  reviewsRef: AngularFirestoreCollection<Review> = null;

  constructor(private db: AngularFirestore) { 
    //When initiated, get all the song information from database
    this.songsRef = db.collection(this.dbPath);
  }


  //Create song in database using the Song model and set initial values that are not retrieved from form
  async createSong(song: Song)  {
    song.hidden = false;
    song.reviews = 0;
    song.total = 0;
    return this.songsRef.add({...song});
  }

  getSong(key: string): AngularFirestoreDocument {
    return this.db.doc(this.dbPath + '/' + key);
  }


  //Add a review to a specific song and update the properties of the song that represent reviews
  addReview(song: Song, review: Review) {
    let path = this.dbPath + '/' + song.key + '/reviews';
    this.reviewsRef = this.db.collection(path);
    this.reviewsRef.add({...review});
    let songUpdate = {
      reviews: (song.reviews + 1),
      total: (song.total + review.rating)
    };
    this.updateSong(song.key, songUpdate);
    this.getReviews(song);
  }
 
  //Get all reviews for a specific song from the database
  getReviews(song: Song) {
    let path = this.dbPath + '/' + song.key + '/reviews';
    let songInfoRef = this.db.collection(path);
    return songInfoRef;
  }

  //Function to update any value of a song in the database using its key
  updateSong(key: string, value: any): Promise<void> {
    return this.songsRef.doc(key).update(value);
  }
 
  //Function to delete a song from the database using its key
  deleteSong(key: string): Promise<void> {
    return this.songsRef.doc(key).delete();
  }
 
  //Function to retrieve all songs from database
  getSongsList(): AngularFirestoreCollection<Song> {
    return this.songsRef;
  }
 
  //Function to delete all songs from database
  deleteAll() {
    this.songsRef.get().subscribe(
      querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      },
      error => {
        console.log('Error: ', error);
      });
  }

  //Function to toggle a song's hidden attribute to determine if to display it to users
  updateHidden(song: Song) {
    return this.songsRef.doc(song.key).update({
      hidden: !song.hidden
    });
  }

}
