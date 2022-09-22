import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service';
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Color, Label } from "ng2-charts";
import { ToasterService } from '@services/toaster.service';
import { AnimatedDigitComponent } from '@shared/animated-digit/animated-digit.component';


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

  visitorActive: boolean;
  ticketsActive: boolean;
  feedbackActive: boolean;
  conversionActive: boolean;

  public lineChartLabels: Label[] = [];
  public lineChartType: ChartType = "bar";
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartData: ChartDataSets[] = [
    
  ];
  // public lineChartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  //   annotation: '',
  //   legend: {
  //   },
    
  // };
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: '',
    legend: {
      labels: {
        fontColor: 'black',
        
      },
      
      position: 'top' // place legend on the right side of chart
   },
    
      scales: {
         xAxes: [{
            stacked: true // this should be set to make the bars stacked
         }],
         yAxes: [{
            stacked: true // this also..
         }]
      }   
  };

  public lineChartColors: Color[] = [];
  processVariables: any;
  xAxisType = '1';
  nameOfCounts = 'VISITORS'
  feedBackCount: number;
  bgColor: string[];
  label: string;


  constructor(
    private enterpriseApiService: EnterpriseApiService,
    private toasterService: ToasterService, 
  ) {
    this.weekActive = true;
  }


  
  ngOnInit(): void {
    this.onBookAppointMent();
    this.getRetailerStatus();
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

  onBookAppointMent() {
    this.nameOfCounts = "BOOK_APPOINTMENT"
    this.getChartResults();
    this.visitorActive = true;
    this.ticketsActive = false;
    this.feedbackActive = false;
    this.conversionActive = false;
    this.lineChartType = "line"; 
    // this.label= 'My First Dataset',
    this.lineChartColors = [
      {
        borderColor: '#EF7D2B ',
      backgroundColor:  '#F4C696'
      },
    ];
    this.isShown = true;
  }

  onLiveAgent() {
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
    this.isShown = false;
    
  }

  onFeedback() {
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
    this.isShown = false;    
  }
  
  onConversion(){
    this.nameOfCounts = "VISITOR"
    this.getConversionChartResults();
    this.visitorActive = false;
    this.ticketsActive = false;
    this.feedbackActive = false;
    this.conversionActive = true;
    this.lineChartType = "pie"; 
    this.lineChartColors = [
      {
        borderColor: '#11af12',
        backgroundColor:  [ '#FFEC00','#52D726']
      },
    ];
    this.isShown = false;
    
  }

  colorGenerator() {
    return 'rgba(255, 99, 132, 0.2)';
  } 

  async getChartResults() {
    if (this.lineChartData[0] && this.lineChartData[1] && this.lineChartData[2] && this.lineChartData[3]) {
      this.lineChartData[0].data = [];
      this.lineChartData[1].data = [];
      this.lineChartData[2].data = [];
      this.lineChartData[3].data = [];
    } else if (this.lineChartData[0]) {
      this.lineChartData[0]['data'] = [];
    }  
    
    try {
      const params = {
        xAxis: this.xAxisType,
        nameOfCounts: this.nameOfCounts
      }
      const response: any = await this.enterpriseApiService.getChart(params);
      console.log('getChart', response);

      const appiyoError = response?.Error;
      const apiErrorCode = response.ProcessVariables?.errorCode;
      const errorMessage = response.ProcessVariables?.errorMessage;

      this.processVariables = response?.ProcessVariables
     
      if (appiyoError == '0') {
  
        const graphCounts = this.processVariables.graphDateList;
        const year = this.processVariables.xAxis;
        const totalCount = this.processVariables.totalAverage;
        this.lineChartLabels = [];
        this.lineChartData = [{ data: [],
          // label: totalCount 
          label : "Average Count: " + parseInt(totalCount)
        }];
        let yAxis = []
        let xAxis = [];
        graphCounts.forEach((graph) => {

          if (year == "3"){
            // const graphDate = graph.graphDate;
            // const split = graphDate.split('-');
            // const output = `${split[2]}/${split[1]}`
            // this.lineChartLabels.push(output);
             xAxis.push(graph.graphDate);
            yAxis.push(graph.graphCount);
          }else{
            const graphDate = graph.graphDate;
            const split = graphDate.split('-');
            const output = `${split[2]}/${split[1]}`
            this.lineChartLabels.push(output);
            xAxis.push(output);
            yAxis.push(graph.graphCount);
          }
          this.bgColor =  ['#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF','#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF'];
        })
        
        this.lineChartData[0]['data'] = yAxis.reverse();
        this.lineChartLabels= xAxis.reverse();

        console.log('this.lineChartLabels', this.lineChartLabels) //xAxis
        console.log('this.lineChartData', this.lineChartData) //yAxis
      }
      else {
        if (errorMessage === undefined) {
          return;
        }
        this.toasterService.showError(errorMessage == undefined ? 'Chart error' : errorMessage, 'Dashboard Chart')
      }
    } catch (err) {
      console.log("Error", err);
    }

  }

  async getFeedbackChartResults() {
    if (this.lineChartData[0] && this.lineChartData[1] && this.lineChartData[2] && this.lineChartData[3]) {
      this.lineChartData[0].data = [];
      this.lineChartData[1].data = [];
      this.lineChartData[2].data = [];
      this.lineChartData[3].data = [];
    } else if (this.lineChartData[0]) {
      this.lineChartData[0]['data'] = [];
    }    
    
    try {
      const params = {
        xAxis: this.xAxisType,
        nameOfCounts: this.nameOfCounts
      }
      const response: any = await this.enterpriseApiService.getFeedbackChart(params);
      console.log('getChart', response);

      const appiyoError = response?.Error;
      const apiErrorCode = response.ProcessVariables?.errorCode;
      const errorMessage = response.ProcessVariables?.errorMessage;

      this.processVariables = response?.ProcessVariables
     
      if (appiyoError == '0' && apiErrorCode == "200") {
  
        const graphCounts = this.processVariables.graphDateList;
        const year = this.processVariables.xAxis;
        const totalCount = this.processVariables.totalAverage;
        this.lineChartLabels = [];
        this.lineChartData = [{ data: [],
          // label: totalCount 
          label : "Average Count  " + parseInt(totalCount)
        }];
        let yAxisOk = [];
        let yAxisGood = [];
        let yAxisBad = [];
        let yAxisGreat = [];
        let xAxis = [];
        graphCounts.forEach((graph) => {

          if (year == "3"){
            // const graphDate = graph.graphDate;
            // const split = graphDate.split('-');
            // const output = `${split[2]}/${split[1]}`
            // this.lineChartLabels.push(output);
             xAxis.push(graph.graphDate);
             yAxisOk.push(graph.ok);
             yAxisGood.push(graph.good);
            yAxisBad.push(graph.bad);
            yAxisGreat.push(graph.great);
          }else{
            const graphDate = graph.graphDate;
            const split = graphDate.split('-');
            const output = `${split[2]}/${split[1]}`
            this.lineChartLabels.push(output);
            xAxis.push(output);
            yAxisOk.push(graph.ok);
            yAxisGood.push(graph.good);
            yAxisBad.push(graph.bad);
            yAxisGreat.push(graph.great);
          }
          // this.bgColor =  ['#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF','#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF'];
        })

        this.lineChartData = [{
          label: 'Great',
          data: yAxisGreat.reverse(),
          backgroundColor: 'rgba(54, 162, 235, 0.9)',
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.7)'
         }, {
          label: 'Good',
          data: yAxisGood.reverse(),
          backgroundColor: 'rgba(255, 205, 86, 0.8)',
          hoverBackgroundColor: 'rgba(255, 205, 86, 0.7)'
       }, {
            label: 'Ok',
            data: yAxisOk.reverse(),
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.7)'
        }, {
          label: 'Bad',
          data: yAxisBad.reverse(),
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.7)'
       }];
        
        this.lineChartLabels= xAxis.reverse();

        console.log('this.barChartLabels', this.lineChartLabels) //xAxis
        console.log('this.barChartData', this.lineChartData) //yAxis
      }
      else {
        if (errorMessage === undefined) {
          return;
        }
        this.toasterService.showError(errorMessage == undefined ? 'Chart error' : errorMessage, 'Dashboard Chart')
      }
    } catch (err) {
      console.log("Error", err);
    }

  }


  async getConversionChartResults() {
    if (this.lineChartData[0] && this.lineChartData[1] && this.lineChartData[2] && this.lineChartData[3]) {
      this.lineChartData[0].data = [];
      this.lineChartData[1].data = [];
      this.lineChartData[2].data = [];
      this.lineChartData[3].data = [];
      this.lineChartData.splice(1, this.lineChartData.length-1);
    } else if (this.lineChartData[0]) {
      this.lineChartData[0]['data'] = [];
    }  
    
    try {
      const params = {
        xAxis: this.xAxisType,
        // nameOfCounts: this.nameOfCounts
      }
      const response: any = await this.enterpriseApiService.getConversionChart(params);
      console.log('getChart', response);

      const Error = response?.Error;
      const ErrorCode = response?.ErrorCode;
      const ErrorMessage = response?.ErrorMessage;

      this.processVariables = response?.ProcessVariables
     
      if (Error == '0' ) {
  
        const appointmentCount = this.processVariables.appointmentBookingCount;
        const visitorCount = this.processVariables.visitorCount;
        const year = this.processVariables.xAxis;
        const graphCounts = [{
         "graphCount" : visitorCount,
          "graphDate" : visitorCount
        },
      {
        "graphCount" : appointmentCount,
         "graphDate" : appointmentCount,
      }]
        // this.lineChartLabels = [];
        // this.lineChartData = [{ data: [],
        //   label: 'Count' }];
        let yAxis = []
        let xAxis = [];
        graphCounts.forEach((graph) => {

          if (year == "3"){
            // const graphDate = graph.graphDate;
            // const split = graphDate.split('-');
            // const output = `${split[2]}/${split[1]}`
            // this.lineChartLabels.push(output);
             xAxis.push(graph.graphDate);
            yAxis.push(graph.graphCount);
          }else{
            const output = graph.graphDate;
            // const split = graphDate.split('-');
            // const output = `${split[2]}/${split[1]}`
            this.lineChartLabels.push(output);
            xAxis.push(output);
            yAxis.push(graph.graphCount);
          }
          // this.bgColor =  ['#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF','#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF'];
        })
        
        this.lineChartData[0]['data'] = yAxis.reverse();
        // this.lineChartData[0]['data'] = [appointmentCount, visitorCount]
        this.lineChartLabels= ["Appointment Count", "Visitors Count"]

        console.log('this.lineChartLabels', this.lineChartLabels) //xAxis
        console.log('this.lineChartData', this.lineChartData) //yAxis
      }
      else {
        if (ErrorMessage === undefined) {
          return;
        }
        this.toasterService.showError(ErrorMessage == undefined ? 'Chart error' : ErrorMessage, 'Dashboard Chart')
      }
    } catch (err) {
      console.log("Error", err);
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


