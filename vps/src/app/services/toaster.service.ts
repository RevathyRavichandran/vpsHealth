import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    private subject = new Subject<any>();
    sendClickEvent() {
      this.subject.next();
    }
    getClickEvent(): Observable<any>{ 
      return this.subject.asObservable();
    }
    private data = new BehaviorSubject('');
    currentData = this.data.asObservable();

    constructor(private toastr: ToastrService) { }

    updateMessage(item: any) {
        this.data.next(item);
    }
   
    showSuccess(message, title) {
        this.toastr.success(`<h6>${message}</h6>`, title,{
            enableHtml: true
        });
    }

    showError(message, title) {
        this.toastr.error(`<h6>${message}</h6>`, title,{
            enableHtml: true
        });
    }

    showInfo(message, title) {
        this.toastr.info(`<h6>${message}</h6>`, title,{
            enableHtml: true
        });
    }

    showWarning(message, title) {
        this.toastr.warning(`<h6>${message}</h6>`, title,{
            enableHtml: true
        });
    }
}