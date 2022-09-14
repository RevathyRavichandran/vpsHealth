import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-chart-lazy',
  templateUrl: './chart-lazy.component.html',
  styleUrls: ['./chart-lazy.component.css']
})
export class ChartLazyComponent implements OnInit {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.onChart();
  }

  async onChart() {
    this.viewContainerRef.clear();
    const { ChartDashboardComponent } = await import('@shared/charts/chart-dashboard/chart-dashboard.component');
    this.viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(ChartDashboardComponent)
    );
  }

}
