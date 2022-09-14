import { Component, OnInit} from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service'
import { ToasterService } from '@services/toaster.service';
import { DatePipe } from '@angular/common'
import { FormGroup, FormControl } from '@angular/forms';
import { DateRangeService } from '@services/date-range.service';
var moment = require('moment');

import { DaterangepickerComponent } from 'ng2-daterangepicker';
import { UtilityService } from '@services/utility.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 8;
  totalCount: number;
  searchFromDate: any;
  searchToDate: any;
  
  feedbackList: any;
  searchDatas: any;
  
  attachments: any;
  totalRecords: any;
  initValues = {
    title: 'Feedback',
    formDetails: [
      {
        label: 'Domain',
        controlName: 'domain',
        type: 'input',
      },
      // {
      //   label: 'Language',
      //   controlName: 'language',
      //   type: 'input',
      // },
      {
        label: 'Branch',
        controlName: 'facilityName',
        type: 'input',
      },
      // {
      //   label: 'Mobile Number',
      //   controlName: 'mobileNumber',
      //   type: 'input',
      // },
      {
        label: 'Patient Id',
        controlName: 'patientId',
        type: 'input',
      },
      // {
      //   label: 'Phase',
      //   controlName: 'phase',
      //   type: 'input',
      // },
      {
        label: 'Rating',
        controlName: 'rating',
        type: 'input',
      },
      {
        label: 'Waba Number',
        controlName: 'waba_no',
        type: 'input',
      },
      // {
      //   label: 'Comments',
      //   controlName: 'comments',
      //   type: 'input',
      // },
    ],
    header: [ "domain", "Branch", "Patient Id", "Phase", "Rating", "Waba Number", "Comment", "created Date & Time"], // table headers
  }

  customListDatas = {};
  feedbackValue: boolean;
  greatCount: any;
  goodCount: any;
  okCount: any;
  badCount: any;

  constructor(
    private enterpriseService: EnterpriseApiService,
    private toasterService: ToasterService,
    private dateService: DateRangeService,
    private utilityService: UtilityService
  ) {}


  ngOnInit(): void {

    this.getFeedBackList()
  }

  async getFeedBackList(data?) {
    const params = {
      currentPage: this.page || 1,
      perPage: this.itemsPerPage || 10,
      isCSVDownload: true,
      ...data
    }

    console.log('params', params)
    const feedback: any = await this.enterpriseService.getFeedbackList(params);

    console.log('feedback', feedback)
    const appiyoError = feedback?.Error;
    const apiErrorCode = feedback.ProcessVariables?.errorCode;
    const errorMessage = feedback.ProcessVariables?.errorMessage;
    
    if (appiyoError == '0' && apiErrorCode == "200") {
     
      const processVariables = feedback['ProcessVariables']
      this.attachments= processVariables?.attachment

      this.itemsPerPage = processVariables['perPage'];
      let totalPages = processVariables['totalPages'];

      this.totalCount = processVariables?.totalCount;
      this.feedbackList = processVariables['feedbackList'] || [];
      this.totalRecords = processVariables?.totalCount;
      this.feedbackValue = true;
      this.greatCount = processVariables.greatCount;
      this.goodCount = processVariables.goodCount;
      this.okCount = processVariables.okCount;
      this.badCount = processVariables.badCount;
      this.customListDatas = {
        feedbackValue : this.feedbackValue,
        itemsPerPage: this.itemsPerPage,
        perPage: this.page,
        totalCount: this.totalCount,
        totalRecords: this.totalRecords,
        data: this.feedbackList,
        appointment : true,
        feedback: true,
        greatCount: params.rating == 'great' || !params.rating ? this.greatCount : 0,
        goodCount : params.rating == 'good' || !params.rating ? this.goodCount : 0,
        okCount : params.rating == 'ok' || !params.rating ? this.okCount : 0,
        badCount : params.rating == 'bad' || !params.rating ? this.badCount : 0,
        keys: ["domain", "facilityName", "patientId", "phase", "rating", "waba_no", "comment", "createdDateAndTime" ],  // To get the data from key
        //Table header length should be equal to keys
      }
      console.log(this.customListDatas)
      console.log(this.customListDatas['keys'])
      console.log('values' + this.customListDatas['keys'].data)

    } else {
      this.toasterService.showError(feedback['ProcessVariables']?.errorMessage == undefined ? 'Feedback list' : feedback['ProcessVariables']?.errorMessage, 'Feedback')
    }
  }

  async onDownloadCsv(event) {
    var params;
    if (!event.fromDate && !event.toDate) {
      params = {
        fromDate: moment().format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
        isCSVDownload: true,
        isApplyFilter: true,
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

    console.log('params', params)
    const feedback: any = await this.enterpriseService.feedbackCsvDownload(params);

    console.log('feedback', feedback)
    const appiyoError = feedback?.Error;
    const apiErrorCode = feedback.ProcessVariables?.errorCode;
    const errorMessage = feedback.ProcessVariables?.errorMessage;
    
    if (appiyoError == '0' && apiErrorCode == "200") {
     
      const processVariables = feedback['ProcessVariables']
      this.attachments= processVariables?.attachment
      this.utilityService.onDownloadCsv(this.attachments);
     

    } else {
      
      this.toasterService.showError(feedback['ProcessVariables']?.errorMessage == undefined ? 'Feedback download error' : feedback['ProcessVariables']?.errorMessage, 'Feedback')
    }
  }


  async pageChangeEvent(event) {
    this.page = event.pageIndex;
    this.searchDatas = event.searchDatas
    this.getFeedBackList(this.searchDatas)
  }



  applyAndClear(event) {
    this.page = event.pageIndex;
    this.searchDatas = event.searchDatas
   this.getFeedBackList(this.searchDatas)
   
  }




}
