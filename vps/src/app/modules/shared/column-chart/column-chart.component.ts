import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service';
import { Subscription } from 'rxjs';
import { ToasterService } from '@services/toaster.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  colors: string[];
  labels: string[];
};


@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit {
  @ViewChild("chart2") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  processVariables: any;
  xAxisType = '1';
  @Input() xAxis: any;
  @Input() active: any;
  @Input() count: any;
  @Input() fromDate: any;
  @Input() toDate: any;

  lineChartLabels: string[];

  clickEventsubscription:Subscription;


  constructor(private enterpriseApiService: EnterpriseApiService, private toaster: ToasterService) { 
    this.chartOptions = {
      series: [
        {
          name: "Graph Count",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        // formatter: function(val) {
        //   return val + "%";
        // },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      labels: [],
      colors: ['#FD6E88'],
      fill: {
        type: "gradient",
        gradient: {
          gradientToColors: ["#EA3137"],
          stops: [0, 100],
          opacityFrom: 0.8,
          opacityTo: 0.7
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        // labels: {
        //   show: false,
        //   formatter: function(val) {
        //     return val + "%";
        //   }
        // }
      },
      title: {
        text: "Live Agent Analysis",
        
      }
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
    
    // this.lineChartData = [{ data: [],
    // }];

    
    try {
      const params = {
        xAxis: this.xAxis,
        nameOfCounts: 'LIVE_AGENT',
        "fromDate": this.fromDate,
        "toDate": this.toDate
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
        // this.lineChartData = [{ data: [],
        //   // label: totalCount 
        //   label : "Average Count: " + parseInt(totalCount)
        // }];
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
            if(split[2]) {
              this.lineChartLabels.push(output);
              xAxis.push(output);
            } else {
              xAxis.push(graph.graphDate);
            }
            yAxis.push(graph.graphCount);
          }
          // this.bgColor =  ['#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF','#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF'];
        })

        if (this.xAxis == '3' && !this.fromDate) {          
          this.lineChartLabels= xAxis.reverse();
        } else {            
          this.lineChartLabels= xAxis;
        }

          this.chartOptions.series[0].data = yAxis.reverse();
          this.chartOptions.labels = this.lineChartLabels;

        // if (this.xAxisType == '3' && !this.searchFromDate) {
        //   this.lineChartData[0]['data'] = yAxis.reverse();
        //   this.lineChartLabels= xAxis.reverse();
        // } else {
        //   this.lineChartData[0]['data'] = yAxis;
        //   this.lineChartLabels= xAxis;
        // }
        

        // console.log('this.lineChartLabels', this.lineChartLabels) //xAxis
        // console.log('this.lineChartData', this.lineChartData) //yAxis
      }
      else {
        if (errorMessage === undefined) {
          return;
        }
        // this.toasterService.showError(errorMessage == undefined ? 'Chart error' : errorMessage, 'Dashboard Chart')
      }
    } catch (err) {
      console.log("Error", err);
    }


  }

}
