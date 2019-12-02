import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: any;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(data => this.user = data);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //Guard to redirect unauthenticated users to the login page
      if (this.user) { 
        return true; 
      }
      this.router.navigate(['/login']);
      return false;
  }
  
}
