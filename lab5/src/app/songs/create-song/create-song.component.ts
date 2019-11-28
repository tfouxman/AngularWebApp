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
 
  constructor(private songServicce: SongService) { }
 
  ngOnInit() {
  }
 
  newSong(): void {
    this.submitted = false;
    this.song = new Song();
  }
 
  save() {
    this.songServicce.createSong(this.song);
    this.song = new Song();
  }
 
  onSubmit() {
    this.submitted = true;
    this.save();
  }
 
}