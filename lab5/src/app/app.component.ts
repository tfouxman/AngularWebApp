import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lab5';

  constructor(public auth: AuthService) { }
}
