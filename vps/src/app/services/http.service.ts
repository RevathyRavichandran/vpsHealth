import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,private ngxUiLoaderService: NgxUiLoaderService) { }


  get(url:string,showLoader: boolean = true,headers?: any) {

    if(showLoader){
        this.ngxUiLoaderService.start()
    } 

    if (headers) {
      return this.http.get(url, {
        headers: headers
      });
    }

    return this.http.get(url)
  }
  
  post(url:string,body: any,showLoader: boolean = true,headers?: any) {

    if(showLoader){
        this.ngxUiLoaderService.start()
    } 

    if (headers) {
      return this.http.post(url, body, {
        headers: headers
      });
    }
    return this.http.post(url,body)
  }

  put(url:string,body: any,showLoader: boolean = true,headers?: any) {

    if(showLoader){
        this.ngxUiLoaderService.start()
    } 

    if (headers) {
      return this.http.put(url, body, {
        headers: headers
      });
    }

    return this.http.put(url,body)
  }

  logOut() {
    let url = environment.host + '/account/logout';
    return this.http.get(url);
  }
}
