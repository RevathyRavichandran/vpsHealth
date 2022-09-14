import { Component, OnInit } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service';
import { ToasterService } from '@services/toaster.service';
import { AdminService } from '@services/admin.service';

@Component({
  selector: 'app-retailer-status',
  templateUrl: './retailer-status.component.html',
  styleUrls: ['./retailer-status.component.css']
})


export class RetailerStatusComponent implements OnInit {

  retailerStatus : {
    feedbackCount: any,
    ticketCount: any,
    visitorCount: any
  };

  constructor(
    private enterpriseApiService: EnterpriseApiService,
    private adminService: AdminService,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.getRetailerStatus();
  }

  

  async getRetailerStatus() {
    const response: any = await this.enterpriseApiService.getRetailerStatus();

    console.log('getRetailerStatus', response);

    const appiyoError = response.Error;
    const apiErrorCode = response.ProcessVariables?.errorCode;
    const errorMessage = response.ProcessVariables?.errorMessage;

    if (appiyoError === '0' && apiErrorCode == '200') {
      const counts = response?.ProcessVariables     
      this.retailerStatus = {
        feedbackCount: counts?.feedbackCount,
        // feedbackCount : 30,
        ticketCount: counts?.appointmentCount,
        visitorCount: counts?.liveAgentCount
      };
    } else {
      if(errorMessage === undefined){
        return;
      }
      this.toaster.showError(errorMessage, 'Feedback Ticket Visitor Count Dashboard API')
    }
  }

}
