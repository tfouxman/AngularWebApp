import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SongService } from '../song.service';
import { ReviewComponent } from '../review/review.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.scss']
})
export class SongInfoComponent implements OnInit {

  constructor(public infoRef: MatDialogRef<SongInfoComponent>, private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private songService: SongService, private auth: AuthService) { }

  ngOnInit() {
  }

  close() {
    this.infoRef.close();
  }

  openDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.data;
    let dialogRef = this.matDialog.open(ReviewComponent, dialogConfig);
  }
}
