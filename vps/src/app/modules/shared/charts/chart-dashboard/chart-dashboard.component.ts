import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service';
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Color, Label } from "ng2-charts";
import { ToasterService } from '@services/toaster.service';
import { AnimatedDigitComponent } from '@shared/animated-digit/animated-digit.component';
import { DateRangeService } from '@services/date-range.service';
import moment from 'moment';


@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.css']
})
export class ChartDashboardComponent implements OnInit, AfterViewInit {


  nums: Array<number> = [25, 76, 48];

  @ViewChild("oneItem") oneItem: any;
  @ViewChildren("count") count: QueryList<any>;



  isShown: boolean = true ;
  dateFilter: boolean = false; 

  retailerStatus : {
    feedbackCount: any,
    ticketCount: any,
    visitorCount: any,
    conversionCount : any
  };

  xAxis: Array<string> = [];
  yAxis: Array<ChartDataSets> = [];
  // weekData: Array<any> = [];
  // monthData: Array<any> = [];
  // yearData: Array<any> = [];

  weekActive: boolean;
  monthActive: boolean;
  yearActive: boolean;

  public daterange: any = {};

  options: any;
  dateRangeValue: String = '';
  searchFromDate: any = '';
  searchToDate: any = '';

  visitorActive: boolean;
  ticketsActive: boolean;
  feedbackActive: boolean;
  conversionActive: boolean;

  public lineChartLabels: Label[] = [];
  public lineChartType: ChartType = "bar";
  public lineChartLegend = true;
  public lineChartPlugins = [];
  nameOfCounts = 'VISITORS';
  public lineChartData: ChartDataSets[] = [
    
  ];
  // public lineChartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  //   annotation: '',
  //   legend: {
  //   },
    
  // };
  wid = this.nameOfCounts == "VISITORS" ? 0 : 40;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: '',
    elements: {
      line: {
        tension: 0
      }
    },

    legend: {
      labels: {
        fontColor: 'black',
        boxWidth: 0,
        
      },
      onClick: null,
      position: 'top' // place legend on the right side of chart
   },
    
      scales: {
         xAxes: [{
            stacked: true // this should be set to make the bars stacked
         }],
         yAxes: [{
            stacked: true,
            gridLines: {
              display: true,
              color: "rgba(255,99,132,0.2)"
           } // this also..
         }]
      }   
  };

  public lineChartColors: Color[] = [];
  processVariables: any;
  xAxisType = '1';
  
  feedBackCount: number;
  bgColor: string[];
  label: string;


  constructor(
    private enterpriseApiService: EnterpriseApiService,
    private toasterService: ToasterService, 
    private dateService: DateRangeService,
  ) {
    this.weekActive = true;
  }


  
  ngOnInit(): void {
    this.onBookAppointMent();
    this.getRetailerStatus();
    this.options = {
      autoUpdateInput: false,
      autoApply: true,
      locale: { format: 'YYYY-MM-DD',
      applyLabel: 'ok' },
      // alwaysShowCalendars: true,
      startDate: this.dateService.getWhichDay(0),
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


  ngAfterViewInit() {
    
    // this.animateCount();
  }

  animateCount() {
    let _this = this;

    let single = this.oneItem.nativeElement.innerHTML;

    this.counterFunc(single, this.oneItem, 7000);

    this.count.forEach(item => {
      _this.counterFunc(item.nativeElement.innerHTML, item, 2000);
    });
  }

  counterFunc(end: number, element: any, duration: number) {
    let range, current: number, step, timer;

    range = end - 0;
    current = 0;
    step = Math.abs(Math.floor(duration / range));

    timer = setInterval(() => {
      current += 1;
      element.nativeElement.textContent = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, step);
  }

  onWeek() {
    this.clear();
    this.dateFilter = false;
    this.xAxisType = "1";
    if(this.conversionActive){
      this.getConversionChartResults();
    } else if (this.feedbackActive) {
      this.getFeedbackChartResults();
    } else {
      this.getChartResults();
    }
    // this.getChartResults();
    this.weekActive = true;
    this.monthActive = false;
    this.yearActive = false;
    // this.bgColor = ['#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF'];

  }
  
  onMonth() {
    this.clear();
    this.dateFilter = false;
    this.xAxisType = "2";
    if(this.conversionActive){
      this.getConversionChartResults();
    } else if (this.feedbackActive) {
      this.getFeedbackChartResults();
    } else {
      this.getChartResults();
    }
    // this.getChartResults();
    this.weekActive = false;
    this.monthActive = true;
    this.yearActive = false;
    // this.bgColor = ['#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF','#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF'];
  }

  onYear() {
    this.clear();
    this.dateFilter = false;
    this.xAxisType = "3";
    if(this.conversionActive){
      this.getConversionChartResults();
    } else if (this.feedbackActive) {
      this.getFeedbackChartResults();
    } else {
      this.getChartResults();
    }
    // this.getChartResults();
    this.weekActive = false;
    this.monthActive = false;
    this.yearActive = true;
    // this.bgColor = ['#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3'];
  }

  apply() {
    
    if (this.searchFromDate && this.searchToDate) {
      this.dateFilter = true;
      if (this.conversionActive) {
        this.onConversion();
      } else if (this.feedbackActive) {
        this.onFeedback();
      } else if (this.ticketsActive) {
        this.onLiveAgent();
      } else {
        this.onBookAppointMent();
      }
    } else {
      this.toasterService.showError('Please fill date', 'Dashboard Chart')
    }
    

}


  onBookAppointMent() {
    this.dateFilter = this.searchFromDate ? true : false;
    this.nameOfCounts = "BOOK_APPOINTMENT"
    this.lineChartOptions.elements.line.tension = 0;
    this.visitorActive = true;
    this.ticketsActive = false;
    this.feedbackActive = false;
    this.conversionActive = false;
    this.getChartResults();
    
    this.lineChartType = "line"; 
    // this.label= 'My First Dataset',
    this.lineChartColors = [
      {
        borderColor: '#064575',
      backgroundColor:  'rgb(6,69,117, 0.3)'
      },
    ];
    this.lineChartOptions.legend.labels.boxWidth=40;
    this.isShown = true;
  }

  onLiveAgent() {
    this.dateFilter = this.searchFromDate ? true : false;
    this.nameOfCounts = "LIVE_AGENT"
    this.getChartResults();
    this.visitorActive = false;
    this.ticketsActive = true;
    this.feedbackActive = false;
    this.conversionActive = false;
    this.lineChartType = "bar"; 
    this.lineChartColors = [
      {
        borderColor: '#EF7D2B',
      backgroundColor: this.bgColor
      },
    ]
    this.lineChartOptions.legend.labels.boxWidth=0;
    this.isShown = false;
    
  }

  onFeedback() {
    this.dateFilter = this.searchFromDate ? true : false;
    this.nameOfCounts = "FEEDBACK"
    this.getFeedbackChartResults();
    this.visitorActive = false;
    this.ticketsActive = false;
    this.feedbackActive = true;
    this.conversionActive = false;
    this.lineChartType = "bar";
    this.lineChartColors = [
      {        
        backgroundColor:  'rgba(54, 162, 235, 0.8)'
      },
    ];
    this.lineChartOptions.legend.labels.boxWidth=40;
    this.isShown = false;    
  }
  
  onConversion(){
    this.dateFilter = this.searchFromDate ? true : false;
    this.nameOfCounts = "VISITOR"
    this.getConversionChartResults();
    this.visitorActive = false;
    this.ticketsActive = false;
    this.feedbackActive = false;
    this.conversionActive = true;
    this.lineChartType = "pie"; 
    this.lineChartColors = [
      {
        borderColor: '#A7BFE8',
        backgroundColor:  [ '#6190E8','#A7BFE8']
      },
    ];
    this.lineChartOptions.legend.labels.boxWidth=40;
    this.isShown = false;
    
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
    this.onWeek();
  }

  clear() {
  
    this.searchFromDate = '';
    this.searchToDate = '';
    this.dateRangeValue = '';
  }

getChartResults() {
    if(this.ticketsActive  || this.visitorActive) {
      console.log('checking')
      this.toasterService.updateMessage(this.xAxisType);
      // this.toasterService.sendClickEvent();
    }

  }

  async getFeedbackChartResults() {
    if(this.feedbackActive) {
      this.toasterService.updateMessage(this.xAxisType);
    }
  }


  async getConversionChartResults() {
    if(this.conversionActive) {
      this.toasterService.updateMessage(this.xAxisType);
    }

  }

  
  async getRetailerStatus() {
    const response: any = await this.enterpriseApiService.getRetailerStatus();

    console.log('getRetailerStatus', response);

    const appiyoError = response.Error;
    const apiErrorCode = response.ProcessVariables?.errorCode;
    const errorMessage = response.ProcessVariables?.errorMessage;

    if (appiyoError === '0' && apiErrorCode == '200') {
      const counts = response?.ProcessVariables   
      // this.feedBackCount =   Number(counts?.feedbackCount)
      this.retailerStatus = {
        feedbackCount: counts?.feedbackCount,
        ticketCount: counts?.appointmentCount,
        visitorCount: counts?.liveAgentCount,
        conversionCount : counts?.appointmentRating
      };
    } else {
      if(errorMessage === undefined){
        return;
      }
      this.toasterService.showError(errorMessage == undefined ? 'Count error' : errorMessage, 'Feedback Ticket Visitor Count Dashboard API')
    }
  }

}


