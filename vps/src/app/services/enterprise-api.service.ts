import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import RequestEntity from '../model/request.entity';
import { ApiIdsService } from './api-ids.service';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseApiService {

  constructor(private httpService: HttpService,
    private apiService: ApiIdsService) { }

    // VPS  Apis


  getRetailerStatus() {
    return new Promise((resolve, reject) => {
      const processData = {};
      const processId = this.apiService.api.getRetailerStatus.processId;
      const workflowId = this.apiService.api.getRetailerStatus.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };

      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;
      // const url = `${environment.host}d/workflows/${workflowId}/execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }


  getFeedbackList(params){
    return new Promise((resolve, reject) => {
      const processId = this.apiService.api.feedbackList.processId;
      const workflowId = this.apiService.api.feedbackList.workflowId;
      const projectId = environment.projectIds.vps;
      
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: params,
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


  getLiveAgentList(searchData?: any) {
    return new Promise((resolve, reject) => {
      const processId = this.apiService.api.getLiveAgentAPI.processId;
      const workflowId = this.apiService.api.getLiveAgentAPI.workflowId;
      const projectId = environment.projectIds.vps;
      
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: searchData,
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

  getAppointmentList(searchData?: any) {
    return new Promise((resolve, reject) => {
      const processId = this.apiService.api.getAppointment.processId;
      const workflowId = this.apiService.api.getAppointment.workflowId;
      const projectId = environment.projectIds.vps;
      
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: searchData,
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


  getConversationList(searchData?: any) {
    return new Promise((resolve, reject) => {
      const processId = this.apiService.api.getConversation.processId;
      const workflowId = this.apiService.api.getConversation.workflowId;
      const projectId = environment.projectIds.vps;
      
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: searchData,
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


  getMilestoneList(searchData?: any) {
    return new Promise((resolve, reject) => {
      const processId = this.apiService.api.getMilestone.processId;
      const workflowId = this.apiService.api.getMilestone.workflowId;
      const projectId = environment.projectIds.vps;
     
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: searchData,
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

  getActivityList(searchData?: any) {
    return new Promise((resolve, reject) => {
      const processId = this.apiService.api.getActivity.processId;
      const workflowId = this.apiService.api.getActivity.workflowId;
      const projectId = environment.projectIds.vps;
      
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: searchData,
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

  getChart(data) {
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.getChartData.processId;
      const workflowId = this.apiService.api.getChartData.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };


      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }

  getFeedbackChart(data) {
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.getFeedbackChartData.processId;
      const workflowId = this.apiService.api.getFeedbackChartData.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };


      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }

  getConversionChart(data) {
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.getConversionChartData.processId;
      const workflowId = this.apiService.api.getConversionChartData.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };


      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }

  liveAgentCsvDownload(data){
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.liveAgentCsv.processId;
      const workflowId = this.apiService.api.liveAgentCsv.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };


      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }

  appointmentCsvDownload(data){
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.appoitmentCsv.processId;
      const workflowId = this.apiService.api.appoitmentCsv.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };
      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }

  conversationCsvDownload(data){
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.convarsationCsv.processId;
      const workflowId = this.apiService.api.convarsationCsv.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };
      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }

  feedbackCsvDownload(data){
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.feedbackCsv.processId;
      const workflowId = this.apiService.api.feedbackCsv.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };


      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }

  milestoneCsvDownload(data){
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.milestoneCsv.processId;
      const workflowId = this.apiService.api.milestoneCsv.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };


      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }

  activityCsvDownload(data){
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.activityCsv.processId;
      const workflowId = this.apiService.api.activityCsv.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };


      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }


  // region screen 

  getRegionData(data){
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.regionData.processId;
      const workflowId = this.apiService.api.regionData.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };


      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }

  // filters
  getAppointmentPatientId(data){
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.appointmentPatientID.processId;
      const workflowId = this.apiService.api.appointmentPatientID.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };


      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }

  getFeedbackFilter(data){
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.feedbackFilter.processId;
      const workflowId = this.apiService.api.feedbackFilter.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };


      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }

  getLiveAgentFilter(data){
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.liveAgentFilter.processId;
      const workflowId = this.apiService.api.liveAgentFilter.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };


      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }

  getMilestoneFilter(data){
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.milestoneFilter.processId;
      const workflowId = this.apiService.api.milestoneFilter.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };


      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }

  getConversionFilter(data){
    return new Promise((resolve, reject) => {
      const processData = data;
      const processId = this.apiService.api.conversionFilter.processId;
      const workflowId = this.apiService.api.conversionFilter.workflowId;
      const projectId = environment.projectIds.vps;
      const body: RequestEntity = {
        processId: processId,
        ProcessVariables: processData,
        workflowId: workflowId,
        projectId: projectId
      };


      console.log("Body", body);
      const url = `${environment.host}d/workflows/${workflowId}/${environment.apiVersion.api}execute?projectId=${projectId}`;

      this.httpService.post(url, body, true).toPromise().then((res) => {
        resolve(res)
      }).catch((rejectRes) => {
        reject(rejectRes);
      });

    });
  }
}
