import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpService } from '@services/http.service'
import RequestEntity from '../model/request.entity';
import { ApiIdsService } from './api-ids.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpService,
    private apiService: ApiIdsService) { }

  detectModal$: BehaviorSubject<string> = new BehaviorSubject('');
    
    setModal(data) {
        this.detectModal$.next(data)
    }

  getLoginCredentials(data) {


    // return new Promise((resolve, reject) => {
    //   const processData = data;
    //   const processId = this.apiService.api.login.processId;
    //   const workflowId = this.apiService.api.login.workflowId;
    //   const projectId = environment.projectIds.whitehatjr;
    //   const body: RequestEntity = {
    //     processId: processId,
    //     ProcessVariables: processData,
    //     workflowId: workflowId,
    //     projectId: projectId
    //   };

    //   console.log("Body", body);
    //   const url = `${environment.host}d/workflows/${workflowId}/execute?projectId=${projectId}`;

    //   this.httpService.put(url, body, true).toPromise().then((res) => {
    //     resolve(res)
    //   }).catch((rejectRes) => {
    //     reject(rejectRes);
    //   });

    // });

    return new Promise((resolve,reject)=> {
          const url = 
          // environment.host + 'account/'+ 'login'
          environment.host + 'account/'+ environment.apiVersion.login +'login';

        let body = data;
        
      this.httpService.post(url, body,true).toPromise().then((res)=> {
        resolve(res)
      }).catch((rejectRes) =>{
        reject(rejectRes);
      });

    });
   
  }


getLoginCredentialsFirst(data) {

  return new Promise((resolve,reject)=> {
        const url =
        environment.host + 'account/'+ environment.apiVersion.login +'login';
      let body = {
        email : data.email,
        password : data.password,
        useADAuth: false
      };


      const showLoader: boolean = true;
      
  this.httpService.post(url, body,showLoader).toPromise().then((res)=> {
    resolve(res)
  });

  })
 
}



getLoginCredentialsSecond(data) {

  return new Promise((resolve,reject)=> {
        const url =
        environment.host + 'account/'+ environment.apiVersion.login +'login';
      let body = {
        email : data.email,
        password : data.password,
        useADAuth: false
      };
      
  this.httpService.post(url, body,false).toPromise().then((res)=> {
    resolve(res)
  });

  })
 
}

getLoginCredentialsThird(data) {

  return new Promise((resolve,reject)=> {
        const url =
        environment.host + 'account/'+ environment.apiVersion.login +'login';
      let body = {
        email : data.email,
        password : data.password,
        useADAuth: false
      };
      
  this.httpService.post(url, body,false).toPromise().then((res)=> {
    resolve(res)
  });

  })
 
}

}
