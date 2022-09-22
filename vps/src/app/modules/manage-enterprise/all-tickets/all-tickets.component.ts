import { Component, OnInit} from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service';
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';
var moment = require('moment');
@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.css']
})
export class AllTicketsComponent implements OnInit {

  allTickets: Array<any> = [];
  page: number = 1;
  itemsPerPage: number = 8;
  totalCount: number;
  
  searchFromDate: any = '';
  searchToDate: any = '';
 
  wabaList: any = [];

  searchDatas: any;
  attachments: any;
  totalRecords: any;
  initValues = {
    title: 'Live Agent',
    formDetails: [
      {
        label: 'Language ',
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
      {
        label: 'Patient Id',
        controlName: 'patientId',
        type: 'input'
      },
      {
        label: 'Mobile Number',
        controlName: 'mobileNumber',
        type: 'input',
      },
      {
        label: 'Waba Number',
        controlName: 'WABANumber',
        type: 'select',
        list: this.wabaList
      },
     
    ],
    header: ['SNo', "Date & Time", "Mobile Number","WABA No", 'language', 'Patient ID',  "Comments"], // table headers
  }

  customListDatas= {}
  agentValue: boolean;

  constructor(
    private enterpriseService: EnterpriseApiService, 
    private toasterService: ToasterService, 
    private utilityService: UtilityService
  ) {}



  ngOnInit(): void {
    this.getLiveAgentData()
  }

  async getFeedbackFilter() {
    const params = {
    }

    console.log('params', params);

    const visitors: any = await this.enterpriseService.getLiveAgentFilter(params);

    console.log('Visitors', visitors)

    const appiyoError = visitors?.Error;
    if (appiyoError == '0') {

      const processVariables = visitors['ProcessVariables']
      
      this.wabaList = processVariables['wabaList'] || [];
      // console.log('test', this.patientList[0].label)
      // this.changeDetectorRef.detectChanges(); 

      
    } else {
      this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'patient id list error' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
    }
  }

  async getLiveAgentData(searchData?) {
    const params = {
      currentPage: this.page || 1,
      perPage: this.itemsPerPage || 10,
      isApplyFilter: false,
      isCSVDownload: true,
      ...searchData
    }

    if(this.wabaList.length==0) {
      await this.getFeedbackFilter();
      this.initValues.formDetails[3].list = this.wabaList;
    }

    console.log('params', params)

    const ticketsData: any = await this.enterpriseService.getLiveAgentList(params);

    console.log('Tickets Data', ticketsData)

    const appiyoError = ticketsData?.Error;
    const apiErrorCode = ticketsData.ProcessVariables?.errorCode;
    const errorMessage = ticketsData.ProcessVariables?.errorMessage;
    

    if (appiyoError == '0' && apiErrorCode == "200") {
      const processVariables = ticketsData['ProcessVariables']
      
      this.itemsPerPage = processVariables['perPage'];
      let totalPages = processVariables['totalPages'];
      this.totalCount = Number(this.itemsPerPage) * Number(totalPages);
      this.allTickets = processVariables['liveAgentList'] || [];
      this.totalRecords = processVariables?.totalItems;
      
      this.customListDatas = {
        agentValue : true,
        itemsPerPage: this.itemsPerPage,
        perPage: this.page,
        totalCount: this.totalCount,
        totalRecords: this.totalRecords,
        data: this.allTickets,
        appointment : true,
        keys: ['SNo', "createdDateAndTime", "mobileNumber","WABANumber", "language",'patientId', "comment"],  // To get the data from key
      }    
  } else {
      
      this.toasterService.showError(ticketsData['ProcessVariables']?.errorMessage == undefined ? 'Live agent list' : ticketsData['ProcessVariables']?.errorMessage, 'Tickets')
    }
  }

  async onDownloadCsv(event){
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
    const ticketsData: any = await this.enterpriseService.liveAgentCsvDownload(params);
    console.log('Tickets Data', ticketsData)

    const appiyoError = ticketsData?.Error;
    const apiErrorCode = ticketsData.ProcessVariables?.errorCode;
    const errorMessage = ticketsData.ProcessVariables?.errorMessage;

    if (appiyoError == '0' && apiErrorCode == "200") {
      const processVariables = ticketsData['ProcessVariables']
      this.attachments= processVariables?.attachment;
      this.utilityService.onDownloadCsv(this.attachments);
      
  } else {
      this.toasterService.showError(ticketsData['ProcessVariables']?.errorMessage == undefined ? 'Download error' : ticketsData['ProcessVariables']?.errorMessage, 'Tickets')
    }  
  }


  async pageChangeEvent(event) {
    this.page = event.pageIndex;
    this.searchDatas = event.searchDatas
    this.getLiveAgentData(this.searchDatas)
    
  }

  applyAndClear(event) {
    this.searchDatas = event.searchDatas;
    this.page = event.pageIndex;
    this.getLiveAgentData(this.searchDatas)
  }




}
