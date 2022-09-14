import { Component, OnInit, Output, ViewChild, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRangeService } from '@services/date-range.service';
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';
import { DaterangepickerComponent } from 'ng2-daterangepicker';


@Component({
  selector: 'app-custom-list',
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.css']
})
export class CustomListComponent implements OnInit, OnChanges {

  searchForm: FormGroup
  searchFromDate: any = '';
  searchToDate: any = '';
  @ViewChild(DaterangepickerComponent)
  private picker: DaterangepickerComponent;
  // roleType: string;
  formDetails: any;
  tableDetails: any = {};
  isShow: boolean = false;
  dataArr: any;
  totalRecords: any;
  title: any;
  totalCount: Number;
  isNoRecord: boolean = true;
  appointmentRating: any;
  totalAppointment: any;
  totalVisitors: any;
  conversion: boolean ;
  feedBackValue: boolean;
  agentValue: boolean;
  appointment: boolean;
  feedback : boolean;
  greatCount: any;
  goodCount: any;
  okCount: any;
  badCount: any;

  @Input() set initValues(value: any) {
    console.log('value', value)
    if (!value) {
      return;
    }
    this.title = value?.title
    this.tableDetails['header'] = value?.header;
    const form = value?.formDetails
    this.searchForm = new FormGroup({});
    form.map((el) => {
      this.searchForm.addControl(el['controlName'], new FormControl(''))
    })


    this.formDetails = value?.formDetails;
    this.isShow = true;
  }


  @Input() set data(value: any) {
    console.log('value', value)
    if (!value) {
      return;
    }
    const data = value?.data;
    this.isNoRecord = (!data || data.length == 0) ? true : false;
    this.itemsPerPage = Number(value?.itemsPerPage),
      this.page = Number(value?.perPage)
    this.totalCount = Number(value?.totalCount);
    this.tableDetails['keys'] = value?.keys;
    const headers = this.tableDetails['header'] ;
    const keys = this.tableDetails['keys']
    if ( headers && keys && (headers?.length !== keys?.length)) {
      console.log('this.tableDetails', this.tableDetails)
      this.toasterService.showInfo('Table Column Count', "Mistatch")
      this.isNoRecord = true;
      return;
    }
    this.totalRecords = value?.totalRecords;
    this.totalVisitors = value?.totalVisitors;
    this.totalAppointment = value?.totalAppointment;
    this.appointmentRating = value?.appointmentRating;
    this.conversion = value?.conversion;
    this.appointment = value?.appointment;
    this.feedback = value?.feedback;
    this.greatCount = value?.greatCount;
    this.goodCount = value?.goodCount;
    this.okCount = value?.okCount;
    this.badCount = value?.badCount;   
    this.dataArr = value?.data;
    this.feedBackValue = value?.feedbackValue;
    this.agentValue = value?.agentValue;
  }

  @Output() download = new EventEmitter();
  @Output() applyAndClear = new EventEmitter();
  @Output() pagination = new EventEmitter();


  public daterange: any = {};

  options: any;
  itemsPerPage: Number;
  page: Number;
  isApplyClicked: boolean;
  searchDatas: any = {};
  dateRangeValue: String = '';

  constructor(private dateService: DateRangeService,
    private utilityService: UtilityService,
    private toasterService: ToasterService) {
    // this.roleType = localStorage.getItem('roleType')
  }

  ngOnInit(): void {
    this.options = {
      autoUpdateInput: false,
      locale: { format: 'YYYY-MM-DD', },
      alwaysShowCalendars: true,
      startDate: this.dateService.getWhichDay(6),
      endDate: this.dateService.getWhichDay(0),
      //minDate: this.dateService.getLastTweleveMonthDate(),
      maxDate: new Date(),
      ranges: {
        'Today': [this.dateService.getWhichDay(0)],
        'Yesterday': [this.dateService.getWhichDay(1), this.dateService.getWhichDay(1)],
        'Last 7 Days': [this.dateService.getWhichDay(6)],
        'Last 30 Days': [this.dateService.getWhichDay(29)],
        // 'This Month': [moment().startOf('month'), moment().endOf('month')],
        // 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    };
  }

  ngOnChanges() {

  }

  public selectedDate(value: any, datepicker?: any) {
    // this is the date  selected
    console.log(value);

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // use passed valuable to update state
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;


    const startDate = this.dateService.getTicketDateFormat(value.start['_d']);
    const endDate = this.dateService.getTicketDateFormat(value.end['_d']);

    this.searchFromDate = startDate;

    this.searchToDate = endDate;

    this.dateRangeValue = `${this.searchFromDate} - ${this.searchToDate}`
  }

  clearDate() {
    this.searchFromDate = '';
    this.searchToDate = '';
    this.dateRangeValue = '';
  }


  onDownload() {
    const formValue = this.searchForm.getRawValue()
    this.download.emit(this.searchDatas)
  }

  clear() {
    if (!this.isApplyClicked) {
      return;
    }
    this.isApplyClicked = false;
    this.searchForm.reset()
    this.searchFromDate = '';
    this.searchToDate = '';
    this.dateRangeValue = '';

    this.picker.datePicker.setStartDate(this.dateService.getWhichDay(6));
    this.picker.datePicker.setEndDate(this.dateService.getWhichDay(0));
    this.page = 1;
    this.searchDatas = {}
    const filterClearedDatas = {
      searchDatas: this.searchDatas,
      pageIndex: 1
    }

    this.applyAndClear.emit(filterClearedDatas)
  }

  apply() {
    const formValue = this.searchForm.getRawValue();
    const isHaveValues = Object.keys(formValue).some((key) => {
      return (!!(formValue[key]) || !!this.dateRangeValue)
    })
    if (!isHaveValues) {
      this.clear()
      return;
    }
    this.isApplyClicked = true;

    this.searchDatas = {
      fromDate: this.searchFromDate,
      toDate: this.searchToDate,
      isApplyFilter: true,
      ...formValue,
    }

    // if(this.title != 'Feedback'){
    //   this.searchDatas['isApplyFilter'] = true
    // }

    const filterAppliedDatas = {
      searchDatas: this.searchDatas,
      pageIndex: 1
    }
    this.applyAndClear.emit(filterAppliedDatas)
  }

  pageChangeEvent(event) {
    this.page = Number(event);
    const paginationDatas = {
      searchDatas: this.searchDatas,
      pageIndex: this.page
    }
    this.pagination.emit(paginationDatas)

  }

}
