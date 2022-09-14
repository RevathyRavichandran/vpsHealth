import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private route: Router,
    private ngxUiLoaderService: NgxUiLoaderService,
    private httpService: HttpService
  ) { }

  detectSideNavbar$: BehaviorSubject<string> = new BehaviorSubject('');
  createEnterprisePathHistory$: BehaviorSubject<string> = new BehaviorSubject('');
  sessionTimeOut$: BehaviorSubject<number> = new BehaviorSubject(null);

  setSideNavbarRoute(data) {
    this.detectSideNavbar$.next(data);
  }

  setCreateEnterprisePathHistory(path) {
    this.createEnterprisePathHistory$.next(path);
  }

  setSessionTimeOut(data){
    this.sessionTimeOut$.next(data);
  }

  onDownloadCsv(attachment){
    const link = document.createElement('a');
    const blob = new Blob([atob(attachment.content)], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', attachment.name);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  logOut() {
    // localStorage.clear();    
    // this.route.navigateByUrl('/login');
    // console.clear(); 
    // return 
    this.httpService.logOut().subscribe(
      (res) => {
        this.ngxUiLoaderService.stop();
        this.sessionTimeOut$.next(0);
      },
      (error) => {
        this.ngxUiLoaderService.stop();
      }
    );
    this.removeAllLocalStorage();
    
  }

  removeAllLocalStorage() {
    localStorage.clear();    
    this.route.navigateByUrl('/login');
    console.clear();  
  }
}
