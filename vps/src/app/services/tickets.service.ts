import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import RequestEntity from '../model/request.entity';
import { ApiIdsService } from './api-ids.service';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private apiService: ApiIdsService,private httpService: HttpService) { }

  

  getParticularTicketData(id) {

    return new Promise((resolve, reject) => {
      const processId = this.apiService.api.getParticularTicketAPI.processId;
      const workflowId = this.apiService.api.getParticularTicketAPI.workflowId;
      const projectId = environment.projectIds.whitehatjr;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: {ticketNumber : id},
        workflowId: workflowId,
        projectId: projectId
      };

      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    })

  }

  getSearchTicketsData(ticketsInput) {

    return new Promise((resolve, reject) => {
      const processId = this.apiService.api.searchTickets.processId;
      const workflowId = this.apiService.api.searchTickets.workflowId;
      const projectId = environment.projectIds.whitehatjr;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: ticketsInput,
        workflowId: workflowId,
        projectId: projectId
      };

      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    })
  }

  getSearchByTicketId(ticketsInput) {

    return new Promise((resolve, reject) => {
      const url = `${environment.host}tickets/${ticketsInput}`;
      this.httpService.get(url, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    })
  }

}
