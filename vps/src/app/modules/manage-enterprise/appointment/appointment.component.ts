import { Component, OnInit } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service'
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';
var moment = require('moment');

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {


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
    title: 'Appointment',
    formDetails: [
      {
        label: 'Language',
        controlName: 'language',
        type: 'input'
      },
      {
        label: 'Patient Id',
        controlName: 'patientIdFilter',
        type: 'input'
      },
      // {
      //   label: 'Appointment Id',
      //   controlName: 'appointmentId',
      //   type: 'input'
      // },
      {
        label: 'Region',
        controlName: 'regionFilter',
        type: 'input'
      },
      {
        label: 'Branch',
        controlName: 'facilityFilter',
        type: 'input'
      },
      {
        label: 'Department',
        controlName: 'departmentNameFilter',
        type: 'input'
      },
      {
        label: 'Physician name',
        controlName: 'physicianNameFilter',
        type: 'input'
      },
      
      // {
      //   label: 'Appointment Date',
      //   controlName: 'appointmentDate',
      //   type: 'input'
      // }
    ],
    header: ['Language', "Patient Id",  "Appointment Id", "Region", "Branch", "Department", "Physician Name", "Appointment Date", "Created Date&Time" ], // table headers
  }
  customListDatas: {};

  constructor(
    private enterpriseService: EnterpriseApiService,
    private toasterService: ToasterService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.getAppointmentList()
  }

  async getAppointmentList(searchData?) {
    const params = {
      currentPage: this.page || 1,
      perPage: this.itemsPerPage || 10,
      // isApplyFilter: false,
      isCSVDownload: true,
      ...searchData
    }

    console.log('params', params);

    const visitors: any = await this.enterpriseService.getAppointmentList(params);

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
      this.visitorsList = processVariables['appointmentList'] || [];

      this.customListDatas = {
        itemsPerPage: this.itemsPerPage,
        perPage: this.page,
        totalCount: this.totalCount,
        totalRecords: this.totalRecords,
        data: this.visitorsList,
        appointment : true,
        keys: ['language', "patientId", "appointmentReferenceNumber", "regionName", "facilityName", "departmentName", "physicianName", "appointmentDate", "createdDateAndTime"],  // To get the data from key
      }

    } else {
      this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'Appointment list error' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
    }
  }


  async onDownloadCsv(event) {
    var params;
    if (!event.fromDate && !event.toDate) {
      params = {
        fromDate: moment().format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
        // isApplyFilter: false,
        isCSVDownload: true,
        ...event
      }
    }
    else {
      params = {

        // isApplyFilter: false,
        isCSVDownload: true,
        ...event
      }
      
    }

    console.log('params', params);

    const visitors: any = await this.enterpriseService.appointmentCsvDownload(params);

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
    this.getAppointmentList(this.searchDatas)
  }


  applyAndClear(event?) {
    //this.isApplyClicked = true;
    this.searchDatas = event.searchDatas;
    this.page = event.pageIndex;
    this.getAppointmentList(this.searchDatas)
  }


}
