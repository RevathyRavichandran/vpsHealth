import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service';
import { Subscription } from 'rxjs';
import { ApexChart, ApexLegend, ApexNonAxisChartSeries,
   ApexPlotOptions, ApexResponsive, ApexTitleSubtitle, ChartComponent } from "ng-apexcharts";
   import { ToasterService } from '@services/toaster.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
  title: ApexTitleSubtitle;
  fill: any;
  
};

@Component({
  selector: 'app-radial-chart',
  templateUrl: './radial-chart.component.html',
  styleUrls: ['./radial-chart.component.css']
})
export class RadialChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  processVariables: any;
  xAxisType = '1';
  @Input() xAxis: any;
  @Input() active: any;
  @Input() fromDate: any;
  @Input() toDate: any;

  message = 'Count';
  lineChartLabels: string[];

  clickEventsubscription:Subscription;
  
  constructor(private enterpriseApiService: EnterpriseApiService, private toaster: ToasterService) { 
    this.chartOptions = {
      series: [],
      chart: {
        width: 505,
        type: "pie",
        toolbar: {
          show: true,
          tools: {
            download: true
          },
          offsetX: -15
        }
        
      },
      labels: ["Appointment Count", "Visitors Count"],
      title: {
        text: "Overall Pie Chart Analysis"
      },
      colors: ['#56C5F8', '#5869BF'],
      fill: {
        type: "gradient",
        opacity: 1,
        // pattern: {
        //   enabled: true,
        //   style: [
        //     "verticalLines",
        //     "squares",
        //     "horizontalLines",
        //     "circles",
        //     "slantedLines"
        //   ]
        // }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    if (this.active == true) {
      this.toaster.currentData.subscribe(currentData => {
        this.xAxis = currentData
        setTimeout(() => {
          this.getChart()
        }, 100);})
    }
  }

  async getChart() {
    
    
    
    


    try {
      const params = {
        xAxis: this.xAxis,
        // "fromDate": this.searchFromDate,
        // "toDate": this.searchToDate
        nameOfCounts: 'VISITOR',
        "fromDate": this.fromDate,
        "toDate": this.toDate
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
            // this.lineChartLabels.push(output);
            xAxis.push(output);
            yAxis.push(graph.graphCount);
          }
          // this.bgColor =  ['#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF','#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF'];
        })
        
        this.chartOptions.series = yAxis;
      }
      else {
        if (ErrorMessage === undefined) {
          return;
        }
        // this.toasterService.showError(ErrorMessage == undefined ? 'Chart error' : ErrorMessage, 'Dashboard Chart')
      }
    } catch (err) {
      console.log("Error", err);
    }


  }

}
