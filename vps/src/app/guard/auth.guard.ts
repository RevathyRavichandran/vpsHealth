import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { storage } from '../storage/storage';
import { UtilityService } from '@services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private utilityService: UtilityService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if (localStorage.getItem('loginRequired') == 'true') {
        console.log('storage.checkToken', storage.checkToken)
        if (storage.checkToken()) {
          return new Observable<boolean>((observer) => {
            observer.next(true);
          });
        }
      } else {     
        this.utilityService.logOut();
        return false;
      }
  }
  
}
