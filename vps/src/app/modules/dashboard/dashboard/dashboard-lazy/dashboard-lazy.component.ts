import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-lazy',
  templateUrl: './dashboard-lazy.component.html',
  styleUrls: ['./dashboard-lazy.component.css']
})
export class DashboardLazyComponent implements OnInit {

  constructor(
    private route: Router,
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.onDashboard();
  }

  async onDashboard() {
    this.viewContainerRef.clear();
    const { RetailerStatusComponent } = await import('./retailer-status/retailer-status.component');
    this.viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(RetailerStatusComponent)
    );
  }

}
