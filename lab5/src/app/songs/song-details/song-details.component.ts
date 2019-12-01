import { Component, OnInit, Input } from '@angular/core';
import { SongService } from '../song.service';
import { Song } from '../song';
import { AuthService } from 'src/app/auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {

  songs: any;

  constructor(private songService: SongService, private auth: AuthService) { 
    
  }

  ngOnInit() {
    this.getSongList();
  }

  getSongList() {
    this.songService.getSongsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe(songs => {
      this.songs = songs;
    })
  }

  deleteSongs() {
    this.songService.deleteAll();
  }

  deleteSong() {
    this.songService
    .deleteSong(this.songs.key)
    .catch(err => console.log(err));
  }

  toggleHidden(song) {
    this.songService.updateHidden(song);
  }
}
