import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Song } from './song';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private dbPath = '/songs';

  songsRef: AngularFirestoreCollection<Song> = null;
  reviewsRef: AngularFirestoreCollection<Review> = null;

  constructor(private db: AngularFirestore) { 
    this.songsRef = db.collection(this.dbPath);
  }

  createSong(song: Song): void {
    song.hidden = false;
    this.songsRef.add({...song});
  }

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
 
  getReviews(song: Song) {
    let path = this.dbPath + '/' + song.key + '/reviews';
    let songInfoRef = this.db.collection(path);
    return songInfoRef;
  }

  updateSong(key: string, value: any): Promise<void> {
    return this.songsRef.doc(key).update(value);
  }
 
  deleteSong(key: string): Promise<void> {
    return this.songsRef.doc(key).delete();
  }
 
  getSongsList(): AngularFirestoreCollection<Song> {
    return this.songsRef;
  }
 
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

}
