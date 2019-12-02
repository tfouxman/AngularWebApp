import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SongService } from '../song.service';
import { ReviewComponent } from '../review/review.component';
import { AuthService } from 'src/app/auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.scss']
})
export class SongInfoComponent implements OnInit {

  reviews: any;

  constructor(public infoRef: MatDialogRef<SongInfoComponent>, private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private songService: SongService, private auth: AuthService) { }

  ngOnInit() {
    this.getReviewList();
  }

  //Function to close the MatDialog opened for the song's information
  close() {
    this.infoRef.close();
  }

  //Function to open the MatDialog for a specific song
  openDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.data;
    let dialogRef = this.matDialog.open(ReviewComponent, dialogConfig);
  }

  //Function to retrieve all reviews for a song
  getReviewList() {
    this.songService.getReviews(this.data).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe(reviews => {
      this.reviews = reviews;
    })
  }
}
