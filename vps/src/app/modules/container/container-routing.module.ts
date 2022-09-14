import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { LoginAuthGuard } from 'src/app/guard/login-auth.guard';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AllTicketsComponent } from '../manage-enterprise/all-tickets/all-tickets.component';
import { VisitorsComponent } from '../manage-enterprise/visitors/visitors.component';
import { FeedbackComponent } from '../manage-enterprise/feedback/feedback.component';
import { MilestoneComponent } from '../manage-enterprise/milestone/milestone.component';

const routes: Routes = [
  
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('src/app/modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'list',
        loadChildren: () => import('src/app/modules/manage-enterprise/manage-enterprise.module').then(m => m.ManageEnterpriseModule),
      },
      
      // {
      //   path: 'create-enterprise',
      //   loadChildren: () => import('src/app/modules/create-enterprise/create-enterprise.module').then(m => m.CreateEnterpriseModule)
      // },
      // {
      //   path: 'enterprise/:enterpriseId',
      //   loadChildren: () => import('src/app/modules/create-enterprise/create-enterprise.module').then(m => m.CreateEnterpriseModule)
      // },
      // {
      //   path: 'enterprises',
      //   loadChildren: () => import('src/app/modules/manage-enterprise/manage-enterprise.module').then(m => m.ManageEnterpriseModule)
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('src/app/modules/profile/profile-routing.module').then(m => m.ProfileRoutingModule)
      // },
      // {
      //   path: 'notification',
      //   loadChildren: () => import('src/app/modules/notification/notification.module').then(m => m.NotificationModule)
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
