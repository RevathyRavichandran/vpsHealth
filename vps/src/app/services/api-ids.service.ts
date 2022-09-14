import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiIdsService {
  api = {
    
   
  //vps apis
  getFeedbackChartData: {
    workflowId: '47992b864dc811ecb55f0022480d6e6c',
    processId: '116b2bfcdb4611ec84290022480d6e6c',
    projectId: environment.projectIds.vps
  },

  getRetailerStatus: {
    workflowId: 'c8b4fb1a4c2d11ecb54e0022480d6e6c',
    processId: '93d5b544519911ecb58f0022480d6e6c',
    projectId: environment.projectIds.vps
  },

    feedbackList: {
      workflowId: 'c8b4fb1a4c2d11ecb54e0022480d6e6c',
      processId: 'c8cc9af44c2d11ecb54e0022480d6e6c',
      projectId: environment.projectIds.vps
    },

    getAppointment:{
      workflowId: '56938f604cf511ecb5590022480d6e6c',
      processId: '56938f604cf511ecb5590022480d6e6c',
      projectId: environment.projectIds.vps
    },
    
    //live agent
    getLiveAgentAPI: {
      workflowId: 'c8b4fb1a4c2d11ecb54e0022480d6e6c',
      processId: '0a2723b24c5a11ecb5500022480d6e6c',
      projectId: environment.projectIds.vps
    },

    //appoinment conversation Api
    getConversation: {
      workflowId: 'c8b4fb1a4c2d11ecb54e0022480d6e6c',
      processId: 'e22457584c5a11ecb5500022480d6e6c',
      projectId: environment.projectIds.vps
    },
    
    getMilestone: {
      workflowId: 'c8b4fb1a4c2d11ecb54e0022480d6e6c',
      processId: 'ed7dcbd44cf511ecb5590022480d6e6c',
      projectId: environment.projectIds.vps
    },
    getActivity: {
      workflowId: '898eb67a422711ecaa3f727d5ac274b2',
      processId: '08f2ed86446811ecaa43727d5ac274b2',
      projectId: environment.projectIds.vps
    },
    getChartData: {
      workflowId: '47992b864dc811ecb55f0022480d6e6c',
      processId: '47a8532c4dc811ecb55f0022480d6e6c',
      projectId: environment.projectIds.vps
    },

    getConversionChartData:{
      workflowId: '47992b864dc811ecb55f0022480d6e6c',
      processId: '186630e867a411ecb8da0022480d6e6c',
      projectId: environment.projectIds.vps
    },

    liveAgentCsv: {
      workflowId: 'ab2508a04d1e11ecb55d0022480d6e6c',
      processId: 'ab2b1c724d1e11ecb55d0022480d6e6c',
      projectId: environment.projectIds.vps
    },
    appoitmentCsv:{
      workflowId: 'ab2508a04d1e11ecb55d0022480d6e6c',
      processId: 'ab36428c4d1e11ecb55d0022480d6e6c',
      projectId: environment.projectIds.vps
    },
    convarsationCsv: {
      workflowId: 'ab2508a04d1e11ecb55d0022480d6e6c',
      processId: 'ab30258c4d1e11ecb55d0022480d6e6c',
      projectId: environment.projectIds.vps
    },
    milestoneCsv: {
      workflowId: 'ab2508a04d1e11ecb55d0022480d6e6c',
      processId: 'ab3829624d1e11ecb55d0022480d6e6c',
      projectId: environment.projectIds.vps
    },
    feedbackCsv: {
      workflowId: 'ab2508a04d1e11ecb55d0022480d6e6c',
      processId: 'ab2959fa4d1e11ecb55d0022480d6e6c',
      projectId: environment.projectIds.vps
    },
    activityCsv: {
      workflowId: 'acac77d045fd11ecaa74727d5ac274b2',
      processId: 'acac77d045fd11ecaa74727d5ac274b2',
      projectId: environment.projectIds.vps
    },

    regionData: {
      workflowId: 'e94189a8327c11ed8c9f0022480d6e6c',
      processId: 'e94189a8327c11ed8c9f0022480d6e6c',
      projectId: environment.projectIds.vps
    }
  };
}
