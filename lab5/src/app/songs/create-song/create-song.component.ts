import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
 
import { Song } from '../song';
import { SongService } from '../song.service';
 
@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {
 
  song: Song = new Song();
  submitted = false;

  titleError: any;
  artistError: any;
 
  constructor(private songService: SongService) { }
 
  ngOnInit() {
  }
 
  //Function to reset song variable and reset submitted variable which will reactivate the form
  newSong(): void {
    this.submitted = false;
    this.song = new Song();
  }
 
  //Function to add the song with attributes from the form to the database
  save() {
    this.songService.createSong(this.song);
    this.song = new Song();
  }
 
  //Function to validate that an artist and a title have been entered and submit if valid
  //Also sets error messages and resets them as necessary
  onSubmit() {
    this.artistError = null;
    this.titleError = null;
    if (!!this.song.artist && !!this.song.title) {
      this.submitted = true;
      this.save();
    }
    else {
      if (!this.song.artist) {
        this.artistError = "No artist given!";
      }
      if (!this.song.title) {
        this.titleError = "No title given!";
      }
    }
  }
 
}