import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { map } from 'rxjs/operators'
import { SongInfoComponent } from '../song-info/song-info.component';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  songs: any;

  constructor(private songService: SongService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.getSongList();
  }

  //Retrieve all songs and sort them based on amount of reviews
  getSongList() { 
    this.songService.getSongsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe(songs => {
      this.songs = songs;
      this.orderSongs();
    })
  }

  //Order songs based on amount of reviews
  orderSongs() {
    this.songs.sort((a,b) => b.reviews - a.reviews);
  }

  //Delete all songs in database
  deleteSongs() {
    this.songService.deleteAll();
  }

  //Function to open the ModalDialog component to view more information about the song
  openDialog(song) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = song;
    let dialogRef = this.matDialog.open(SongInfoComponent, dialogConfig);
  }

}
