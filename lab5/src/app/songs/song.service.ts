import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Song } from './song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private dbPath = '/songs';

  songsRef: AngularFirestoreCollection<Song> = null;

  constructor(private db: AngularFirestore) { 
    this.songsRef = db.collection(this.dbPath);
  }

  createSong(song: Song): void {
    this.songsRef.add({...song});
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
