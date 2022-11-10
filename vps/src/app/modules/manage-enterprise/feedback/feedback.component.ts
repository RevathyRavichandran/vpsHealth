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

  wabaList: any = [];
  branchList: any = [];
  
  feedbackList: any;
  searchDatas: any;
  
  attachments: any;
  totalRecords: any;
  initValues = {
    title: 'Feedback',
    formDetails: [
      {
        label: 'Mobile Number',
        controlName: 'mobileNumber',
        type: 'input',
      },
      {
        label: 'Language',
        controlName: 'language',
        type: 'select',
        list:[
          {
            key: 'English',
            value: 'English'
          },
          {
            key: 'Arabic',
            value: 'Arabic'
          }
        ]
      },
      // {
      //   label: 'Domain',
      //   controlName: 'domain',
      //   type: 'input',
      // },
      // {
      //   label: 'Language',
      //   controlName: 'language',
      //   type: 'input',
      // },
      {
        label: 'Branch',
        controlName: 'facilityName',
        type: 'select',
        list: this.branchList
      },
      // {
      //   label: 'Mobile Number',
      //   controlName: 'mobileNumber',
      //   type: 'input',
      // },
      // {
      //   label: 'Patient Id',
      //   controlName: 'patientId',
      //   type: 'input',
      // },
      {
        label: 'Phase',
        controlName: 'phase',
        type: 'select',
        list:[
          {
            key: 'LLP',
            value: 'LLP'
          },
          {
            key: 'VSP',
            value: 'VSP'
          }
        ]
      },
      {
        label: 'Rating',
        controlName: 'rating',
        type: 'select',
        list:[
          {
            key: '1',
            value: 'Great'
          },
          {
            key: '2',
            value: 'Good'
          },
          {
            key: '3',
            value: 'Ok'
          },
          {
            key: '4',
            value: 'Bad'
          }
        ]
      },
      {
        label: 'Waba Number',
        controlName: 'waba_no',
        type: 'select',
        list: this.wabaList
      },
      // {
      //   label: 'Comments',
      //   controlName: 'comments',
      //   type: 'input',
      // },
    ],
    header: [ "SNo", "Date & Time", "Mobile Number", "Waba Number", "Language", "Patient Id", "domain", "Branch", "Phase", "Rating", "Comment"], // table headers
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

  async getFeedbackFilter() {
    const params = {
    }

    console.log('params', params);

    const visitors: any = await this.enterpriseService.getFeedbackFilter(params);

    console.log('Visitors', visitors)

    const appiyoError = visitors?.Error;
    if (appiyoError == '0') {

      const processVariables = visitors['ProcessVariables']
      
      this.wabaList = processVariables['wabaList'] || [];
      this.branchList = processVariables['branchList'] || [];
      // console.log('test', this.patientList[0].label)
      // this.changeDetectorRef.detectChanges(); 

      
    } else {
      this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'patient id list error' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
    }
  }

  async getFeedBackList(data?) {
    const params = {
      currentPage: this.page || 1,
      perPage: this.itemsPerPage || 10,
      isCSVDownload: true,
      ...data
    }

    

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
        greatCount: this.greatCount,
        goodCount : this.goodCount,
        okCount : this.okCount,
        badCount : this.badCount,
        keys: ["SNo", "createdDateAndTime", "mobileNumber", "waba_no", "language", "patientId", "domain", "facilityName", "phase", "rating", "comment" ],  // To get the data from key
        //Table header length should be equal to keys
      }
      console.log(this.customListDatas)
      console.log(this.customListDatas['keys'])
      console.log('values' + this.customListDatas['keys'].data)

    } else {
      this.toasterService.showError(feedback['ProcessVariables']?.errorMessage == undefined ? 'Feedback list' : feedback['ProcessVariables']?.errorMessage, 'Feedback')
    }
    if(this.wabaList.length==0) {
      await this.getFeedbackFilter();
      this.initValues.formDetails[5].list = this.wabaList;
      this.initValues.formDetails[2].list = this.branchList;
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
