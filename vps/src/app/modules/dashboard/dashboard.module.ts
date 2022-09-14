import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { EnterpriseProvisioningComponent } from './enterprise-provisioning/enterprise-provisioning.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RetailerStatusComponent } from './dashboard/dashboard-lazy/retailer-status/retailer-status.component';
import { DashboardLazyComponent } from './dashboard/dashboard-lazy/dashboard-lazy.component';
import { ChartLazyComponent } from './dashboard/dashboard-lazy/retailer-status/chart-lazy/chart-lazy.component'

@NgModule({
  declarations: [
    EnterpriseProvisioningComponent,
    DashboardComponent,
    RetailerStatusComponent,
    DashboardLazyComponent,
    ChartLazyComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ChartsModule,
    AutocompleteLibModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
  ],
  entryComponents: [
    DashboardLazyComponent,
    ChartLazyComponent
  ]
})
export class DashboardModule { }
