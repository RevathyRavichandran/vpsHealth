import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { EnterpriseProvisioningComponent } from './enterprise-provisioning/enterprise-provisioning.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RetailerStatusComponent } from './dashboard/dashboard-lazy/retailer-status/retailer-status.component';


const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    // canActivate:[AuthGuard],
    // children: [
    //   {
    //     path: 'fail',
    //     component: AlertModalComponent
    //   }
    // ]
  },
  // {
  //   path: 'enterprise-provisioning/:id',
  //   component: EnterpriseProvisioningComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
