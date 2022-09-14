import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import validationsData from '../../assets/validations/validations.json';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  getValidationsData(): Observable<any> {
    return this.createObservableObj(validationsData);
    }

  createObservableObj(validations_data:any){
    const obs = new Observable(observer => {
      observer.next(validations_data);
      observer.complete();
    });
    return obs;
  }

}
