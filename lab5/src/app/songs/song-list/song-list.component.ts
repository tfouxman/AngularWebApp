import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  songs: any;

  constructor(private songService: SongService) { }

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

}
