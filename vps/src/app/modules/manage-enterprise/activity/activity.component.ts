import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service'
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';
var moment = require('moment');

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  
  page: number = 1;
  itemsPerPage: number = 8;
  totalCount: number;
  
  searchFromDate: any;
  searchToDate: any;
  activityList: any;
  searchDatas: any;

  initValues = {
    title: 'Activity',
    formDetails: [
      {
        label: 'Mobile Number',
        controlName: 'phoneNumber',
        type: 'input'
      },
      {
        label: 'Name',
        controlName: 'userName',
        type: 'input'
      },
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
        label: 'Activity',
        controlName: 'activity',
        type: 'input'
      }
    ],
    header: ['Name', "Mobile Number","Activity", "status", "created Date & Time"], // table headers
  }
  attachments: any;
  totalRecords: any;
  customListDatas=  {};
  

  constructor(
    private enterpriseService: EnterpriseApiService, 
    private toasterService: ToasterService, 
    private utilityService: UtilityService
  ) {}


  ngOnInit(): void {

    this.getActivityList()  

  }

  async getActivityList(searchData?) {
    const params = {
      currentPage: this.page || 1,
      perPage: this.itemsPerPage || 10,
      isApplyFilter: false,
      isCSVDownload: true,
      ...searchData
    }

    console.log('params', params)
    const activity: any = await this.enterpriseService.getActivityList(params);

    console.log('activity Data', activity)

    const appiyoError = activity?.Error;
    const apiErrorCode = activity.ProcessVariables?.errorCode;
    const errorMessage = activity.ProcessVariables?.errorMessage;
    

    if (appiyoError == '0' && apiErrorCode == "200") {
      const processVariables = activity['ProcessVariables']
      this.itemsPerPage = processVariables['perPage'];
      let totalPages = processVariables['totalPages'];
      this.totalCount = Number(this.itemsPerPage) * Number(totalPages);
      this.activityList = processVariables['activityList'] || [];
      this.totalRecords = processVariables?.totalItems;
      this.customListDatas = {
        itemsPerPage: this.itemsPerPage,
        perPage: this.page,
        totalCount: this.totalCount,
        totalRecords: this.totalRecords,
        data: this.activityList,
        keys: ['name', "mobileNumber","activityName", "isStatus", "createdDateAndTime"],  // To get the data from key
      }

    
    } else {
     
      this.toasterService.showError(activity['ProcessVariables']?.errorMessage == undefined ? 'Activity list error' :
        activity['ProcessVariables']?.errorMessage, 'Activity')
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

    console.log('params', params)
    const activity: any = await this.enterpriseService.activityCsvDownload(params);

    console.log('activity Data', activity)

    const appiyoError = activity?.Error;
    const apiErrorCode = activity.ProcessVariables?.errorCode;
    const errorMessage = activity.ProcessVariables?.errorMessage;
    

    if (appiyoError == '0' && apiErrorCode == "200") {
      const processVariables = activity['ProcessVariables'];
      this.attachments = processVariables?.attachment
      this.utilityService.onDownloadCsv(this.attachments);

    
    } else {
     
      this.toasterService.showError(activity['ProcessVariables']?.errorMessage == undefined ? 'Download error' : activity['ProcessVariables']?.errorMessage, 'Activity')
    }
  }

  async pageChangeEvent(event) {
    
    this.page = event.pageIndex;
    this.searchDatas = event.searchDatas
    this.getActivityList(this.searchDatas)
  }                                      


  applyAndClear(event) {
     // this.isApplyClicked = true;
     this.searchDatas = event.searchDatas;
     this.page = event.pageIndex;
    
    this.getActivityList(this.searchDatas)
  }

  





}

