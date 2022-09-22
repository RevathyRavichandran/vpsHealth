import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service'
import { ToasterService } from '@services/toaster.service';
import { DatePipe } from '@angular/common'
import { FormGroup, FormControl } from '@angular/forms';
import { DateRangeService } from '@services/date-range.service'
var moment = require('moment');
import { DaterangepickerComponent } from 'ng2-daterangepicker';
import { UtilityService } from '@services/utility.service';
//import { constant } from '../../../../storage/constant'
@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 8;
  totalCount: number;
  
  wabaList: any =[];
  mileStoneList: any = [];

  searchFromDate: any;
  searchToDate: any;
  milestoneList: any;
  searchDatas: any;
  attachments: any;
  totalRecords: any;

  initValues = {
    title: 'Milestone',
    formDetails: [
      {
        label: 'Mobile Number',
        controlName: 'mobileNumber',
        type: 'input',
      },
      // {
      //   label: 'Patient Id',
      //   controlName: 'patientId',
      //   type: 'input',
      // },
      {
        label: 'Status',
        controlName: 'status',
        type: 'select',
        list:[
          {
            key: 'ENGAGED',
            value: 'ENGAGED'
          },
          {
            key: 'LEFT',
            value: 'LEFT'
          }
        ]
      },
      {
        label: 'Waba Number',
        controlName: 'waba_no',
        type: 'select',
        list: this.wabaList
      },
      {
        label: 'Milestone',
        controlName: 'milestone',
        type: 'select',
        list: this.mileStoneList
      }
    ],
   
    header: ['SNo', "Date & Time", "Mobile Number", "Waba Number", 'Patient id',"Milestone", "status"], // table headers
  }
  customListDatas= {};
  

  constructor(
    private enterpriseService: EnterpriseApiService, 
    private toasterService: ToasterService, 
    private datePipe: DatePipe,
    private dateService: DateRangeService,
    private utilityService: UtilityService
  ) {}


  ngOnInit(): void {
     this.getMilestoneList()
  }

  async getMilestoneFilterList() {
    const params = {
    }

    console.log('params', params);

    const visitors: any = await this.enterpriseService.getMilestoneFilter(params);

    console.log('Visitors', visitors)

    const appiyoError = visitors?.Error;
    if (appiyoError == '0') {

      const processVariables = visitors['ProcessVariables']
      
      this.wabaList = processVariables['wabaList'] || [];
      this.mileStoneList = processVariables['milestoneList'] || [];
      // console.log('test', this.patientList[0].label)
      // this.changeDetectorRef.detectChanges(); 

      
    } else {
      this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'patient id list error' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
    }
  }

  async getMilestoneList(searchData?) {

    const params = {
      currentPage: this.page || 1,
      perPage: this.itemsPerPage || 10,
      isApplyFilter: false,
      isCSVDownload: true,
      ...searchData
    }

    if(this.wabaList.length==0) {
      await this.getMilestoneFilterList();
      this.initValues.formDetails[2].list = this.wabaList;
      this.initValues.formDetails[3].list = this.mileStoneList;
    }

    console.log('params', params);

    const milestone: any = await this.enterpriseService.getMilestoneList(params);

    console.log('Milestone', milestone)

    const appiyoError = milestone?.Error;
    const apiErrorCode = milestone.ProcessVariables?.errorCode;
    const errorMessage = milestone.ProcessVariables?.errorMessage;
    

    if (appiyoError == '0' && apiErrorCode == "200") {
      
      const processVariables = milestone['ProcessVariables'];
      this.itemsPerPage = processVariables['perPage'];
      let totalPages = processVariables['totalPages'];
      this.totalCount = Number(this.itemsPerPage) * Number(totalPages);
      this.milestoneList = processVariables['milestoneList'] || [];
      this.totalRecords = processVariables?.totalItems;
      
      this.customListDatas = {
        itemsPerPage: this.itemsPerPage,
        perPage: this.page,
        totalCount: this.totalCount,
        totalRecords: this.totalRecords,
        data: this.milestoneList,
        appointment : true,
        keys: ['SNo', "createdDateAndTime", "mobileNumber", "waba_no", 'patientId',"milestone","isStatus"],  // To get the data from key
      }

      
    } else {
     
      this.toasterService.showError(milestone['ProcessVariables']?.errorMessage == undefined ? 'Milestone list error' : milestone['ProcessVariables']?.errorMessage, 'Milestone')
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

    const milestone: any = await this.enterpriseService.milestoneCsvDownload(params);

    console.log('Milestone', milestone)

    const appiyoError = milestone?.Error;
    const apiErrorCode = milestone.ProcessVariables?.errorCode;
    const errorMessage = milestone.ProcessVariables?.errorMessage;
    

    if (appiyoError == '0' && apiErrorCode == "200") {
      
      const processVariables = milestone['ProcessVariables'];
      this.attachments = processVariables?.attachment
      this.utilityService.onDownloadCsv(this.attachments);

      
    } else {
     
      this.toasterService.showError(milestone['ProcessVariables']?.errorMessage == undefined ? 'Milestone download error' : milestone['ProcessVariables']?.errorMessage, 'Milestone')
    }
  }



  async pageChangeEvent(event) {
    console.log(event)
    this.page = event.pageIndex;
    this.searchDatas = event.searchDatas
    this.getMilestoneList(this.searchDatas)
  }


  applyAndClear(event) {
    this.searchDatas = event.searchDatas;
    this.page = event.pageIndex;
    this.getMilestoneList(this.searchDatas)
   
  }


}
