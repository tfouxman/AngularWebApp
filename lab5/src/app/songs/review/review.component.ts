import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SongService } from '../song.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { auth } from 'firebase';
import { AuthService } from 'src/app/auth/auth.service';
import { Review } from '../review';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor(private auth: AuthService, public infoRef: MatDialogRef<ReviewComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private songService: SongService) { }

  currentRate = 5;
  review: Review = new Review();

  ngOnInit() {
  }

  close() {
    this.infoRef.close();
  }

  submitReview() {
    this.review.submittedBy = this.auth.display;
    this.review.rating = this.currentRate;
    this.songService.addReview(this.data, this.review);
    this.close();
  }
}
