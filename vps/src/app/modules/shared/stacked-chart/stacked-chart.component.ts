import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";
import { Subscription } from 'rxjs';
import { ToasterService } from '@services/toaster.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  labels: string[];
  colors: string[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.css']
})
export class StackedChartComponent implements OnInit {
  
  processVariables: any;
  xAxisType = '1';
  @Input() xAxis: any;
  @Input() active: any;
  @Input() count: any;
  @Input() fromDate: any;
  @Input() toDate: any;


  lineChartLabels: string[];

  clickEventsubscription:Subscription;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private enterpriseApiService: EnterpriseApiService, private toaster: ToasterService) {
    this.chartOptions = {
      
      series: [
        {
          name: "Ok",
          data: []
        },
        {
          name: "Good",
          data: []
        },
        {
          name: "Bad",
          data: []
        },
        {
          name: "Great",
          data: []
        }
      ],
      
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
          tools: {
            download: true
          }
          
        },
        zoom: {
          enabled: true
        }
      },
      title: {
        text: "Feedback Analysis",
        align: "left"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "top",
              // offsetX: -10,
              // offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      labels: [],
      colors: ["#FE669C",
      "#EDBBFF",
      "#ADD109",
      "#6BA2FF"],
      legend: {
        position: "top",
        // offsetY: 40
      },
      fill: {
        type: "gradient",
        opacity: 1,
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
    try {
      const params = {
        xAxis: this.xAxis,
        nameOfCounts: 'FEEDBACK',
        "fromDate": this.fromDate,
        "toDate": this.toDate
        // "fromDate": this.searchFromDate,
        // "toDate": this.searchToDate
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
        // this.lineChartData = [{ data: [],
        //   // label: totalCount 
        //   label : "Average Count  " + parseInt(totalCount),
          
        // }];
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
            if(split[2]) {
              this.lineChartLabels.push(output);
              xAxis.push(output);
            } else {
              xAxis.push(graph.graphDate);
            }
            
            yAxisOk.push(graph.ok);
            yAxisGood.push(graph.good);
            yAxisBad.push(graph.bad);
            yAxisGreat.push(graph.great);
          }
          // this.bgColor =  ['#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF','#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF', '#FFE5A8', '#CAADFF', '#FFD1A3', '#9CFCFC', '#D7D7DF', '#FFE0E6', '#A3D9FF'];
        })

        if (this.xAxis == '3' && !this.fromDate) {          
            this.lineChartLabels= xAxis.reverse();
          } else {            
            this.lineChartLabels= xAxis;
          }

          this.chartOptions.series[0].data = yAxisOk.reverse();
          this.chartOptions.series[1].data = yAxisGood.reverse();
          this.chartOptions.series[2].data = yAxisBad.reverse();
          this.chartOptions.series[3].data = yAxisGreat.reverse();
          this.chartOptions.labels = this.lineChartLabels;
      //   this.lineChartData = [{
      //     label: 'Great',
      //     data: yAxisGreat.reverse(),
      //     backgroundColor: 'rgba(54, 162, 235, 0.9)',
      //     hoverBackgroundColor: 'rgba(54, 162, 235, 0.7)'
      //    }, {
      //     label: 'Good',
      //     data: yAxisGood.reverse(),
      //     backgroundColor: 'rgba(255, 205, 86, 0.8)',
      //     hoverBackgroundColor: 'rgba(255, 205, 86, 0.7)'
      //  }, {
      //       label: 'Ok',
      //       data: yAxisOk.reverse(),
      //       backgroundColor: 'rgba(75, 192, 192, 0.8)',
      //       hoverBackgroundColor: 'rgba(75, 192, 192, 0.7)'
      //   }, {
      //     label: 'Bad',
      //     data: yAxisBad.reverse(),
      //     backgroundColor: 'rgba(255, 99, 132, 0.8)',
      //     hoverBackgroundColor: 'rgba(255, 99, 132, 0.7)'
      //  }];
      //  if (this.xAxisType == '3' && !this.searchFromDate) {
      //   this.lineChartLabels= xAxis.reverse();
      // } else {
      //   this.lineChartLabels= xAxis;
      // }
        
      //   console.log('this.barChartLabels', this.lineChartLabels) //xAxis
      //   console.log('this.barChartData', this.lineChartData) //yAxis
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
