import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ToasterService {

    constructor(private toastr: ToastrService) { }

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