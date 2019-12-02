import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  user: any;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(data => this.user = data);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //Guard to redirect non-admin users
      if (this.user) { 
        if (this.user.role == "admin") return true;
      }
      this.router.navigate(['/home']);
      return false;
  }
  
}
