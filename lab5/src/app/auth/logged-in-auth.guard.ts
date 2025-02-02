import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate {
  user: any;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(data => this.user = data);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //Guard that returns true if a user is logged in to block off the login and registration page
      if (this.user) {
        console.log(this.user);
        this.router.navigate(['/home']);
        return false; 
      }
      return true;
  }
  
}
