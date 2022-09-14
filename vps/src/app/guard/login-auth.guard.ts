import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { storage } from '../storage/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    if (localStorage.getItem('loginRequired') == null) {
      return new Observable<boolean>((observer) => {
        observer.next(true);
      });
    } else if (localStorage.getItem('loginRequired') == 'true') {
      if (storage.checkToken()) {
        return new Observable<boolean>((observer) => {
          observer.next(true);
          this.router.navigateByUrl('pages/dashboard');
        });
      }
    } else {
      return false;
    }
  }

}
