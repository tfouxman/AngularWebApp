import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: any;

  constructor(private auth: AuthService) {
    
   }

  ngOnInit() {
    this.getUserList();
  }

  //Function to retrieve all users
  getUserList() {
    this.auth.getUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe(users => {
      this.users = users;
    })
  }

  //Function to toggle disable/enable user
  toggleActive(user) {
    this.auth.toggleActive(user);
  }
}
