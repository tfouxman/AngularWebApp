import { Component, OnInit, Input } from '@angular/core';
import { SongService } from '../song.service';
import { Song } from '../song';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {

  @Input() song: Song;

  constructor(private songService: SongService) { }

  ngOnInit() {
  }

  deleteSong() {
    this.songService
    .deleteSong(this.song.key)
    .catch(err => console.log(err));
  }
}
