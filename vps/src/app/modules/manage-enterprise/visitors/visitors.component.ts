import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service'
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';
var moment = require('moment');
@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {


  page: number = 1;
  itemsPerPage: number = 8;
  totalCount: number;
  ticketData: any;
  showTicketModal: boolean;

  visitorsList: any;
  searchDatas: any;
  attachments: any;
  totalRecords: any;

  initValues = {
    title: 'Appointment Conversion',
    formDetails: [
      // {
      //   label: 'Mobile Number',
      //   controlName: 'mobileNumber',
      //   type: 'input'
      // },
      {
        label: 'Waba Number',
        controlName: 'waba_no',
        type: 'input'
      },
      // {
      //   label: 'Name',
      //   controlName: 'userName',
      //   type: 'input'
      // }
    ],
    header: ['Mobile Number', "Action", "Waba Number", "created Date" , "Time"], // table headers
  }
  customListDatas: {};
  appointmentRating: any;
  totalAppointment: any;
  totalVisitors: any;

  constructor(
    private enterpriseService: EnterpriseApiService,
    private toasterService: ToasterService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.getAppointmentConversationList()
  }

  async getAppointmentConversationList(searchData?) {
    const params = {
      currentPage: this.page || 1,
      perPage: this.itemsPerPage || 10,
      isApplyFilter: false,
      isCSVDownload: true,
      ...searchData
    }

    console.log('params', params);
    if (!params.fromDate) {
      params.fromDate = moment().format("YYYY-MM-DD"),
      params.toDate = moment().format("YYYY-MM-DD")
    }

    const visitors: any = await this.enterpriseService.getConversationList(params);

    console.log('Visitors', visitors)

    const appiyoError = visitors?.Error;
    const apiErrorCode = visitors.ProcessVariables?.errorCode;
    const errorMessage = visitors.ProcessVariables?.errorMessage;

    if (appiyoError == '0' && apiErrorCode == "200") {

      const processVariables = visitors['ProcessVariables']
      this.itemsPerPage = processVariables['perPage'];
      let totalPages = processVariables['totalPages'];
      this.totalCount = Number(this.itemsPerPage) * Number(totalPages);
      this.totalRecords = processVariables?.totalItems;
      this.totalVisitors = processVariables?.totalItems;
      this.totalAppointment = processVariables?.totalAppointment;
      this.appointmentRating = processVariables?.appointmentRating;
      this.visitorsList = processVariables['appointmentConversionList'] || [];

      this.customListDatas = {
        itemsPerPage: this.itemsPerPage,
        perPage: this.page,
        totalCount: this.totalCount,
        totalRecords: this.totalRecords,
        totalVisitors: this.totalVisitors,
        totalAppointment: this.totalAppointment,
        appointmentRating: this.appointmentRating,
        conversion : true,
        appointment : false,
        data: this.visitorsList,
        keys: ['mobileNumber', "isVisitorORBookedUser", "waba_no", "createdDate", "createdTime"],  // To get the data from key
      }

    } else {
      this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'Appointment conversion list' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
    }
  }


  async onDownloadCsv(event) {

    var params;
    if (!event.fromDate && !event.toDate) {
      params = {
        fromDate: moment().format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
        isApplyFilter: false,
        isCSVDownload: true,
        ...event
      }
    }
    else {
      params = {

        isApplyFilter: false,
        isCSVDownload: true,
        ...event
      }
      
    }

    console.log('params', params);

    const visitors: any = await this.enterpriseService.conversationCsvDownload(params);

    console.log('Visitors', visitors)

    const appiyoError = visitors?.Error;
    const apiErrorCode = visitors.ProcessVariables?.errorCode;
    const errorMessage = visitors.ProcessVariables?.errorMessage;

    if (appiyoError == '0' && apiErrorCode == "200") {

      const processVariables = visitors['ProcessVariables']

      this.attachments = processVariables?.attachment;
      this.utilityService.onDownloadCsv(this.attachments);


    } else {
      this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'Download error' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
    }
  }




  async pageChangeEvent(event) {
    console.log(event)
    this.page = event.pageIndex;
    this.searchDatas = event.searchDatas
    this.getAppointmentConversationList(this.searchDatas)
  }


  applyAndClear(event?) {
    //this.isApplyClicked = true;
    this.searchDatas = event.searchDatas;
    this.page = event.pageIndex;
    this.getAppointmentConversationList(this.searchDatas)
  }

}
