import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpService: HttpService) { }

  uploadToAppiyoDrive(fileToUpload: File) {

    return new Promise((resolve,reject)=> {

      let uri = environment.host + environment.appiyoDrive;

      let headers = {
        headers: new HttpHeaders({})
      };
  
      const formData: FormData = new FormData();
      formData.append('files[]', fileToUpload, fileToUpload.name);
  
      this.httpService.post(uri, formData, true, headers).toPromise().then((res)=> {
        resolve(res)
      }).catch((rejectRes) =>{
        reject(rejectRes);
      });

    })
   
  }
}
