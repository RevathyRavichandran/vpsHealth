import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import labelsData from '../../assets/labels/labels.json';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  constructor() { }

  getLabelsData(): Observable<any> {
    return this.createObservableObj(labelsData);
    }

  createObservableObj(labels_data:any){
    const obs = new Observable(observer => {
      observer.next(labels_data);
      observer.complete();
    });
    return obs;
  }
}
