import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MilestoneComponent } from './milestone/milestone.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ManageEnterpriseComponent } from './manage-enterprise.component';
import { ActivityComponent } from './activity/activity.component';
import { AppointmentComponent }  from './appointment/appointment.component';
import { RegionComponent } from 'src/app/matrix/region/region.component';

const routes: Routes = [

  {
    path: '',
    component: ManageEnterpriseComponent,
    children: [
      {
        path: 'visitors',
        component: VisitorsComponent
      },
      {
        path: 'feedback',
        component: FeedbackComponent
      },
      {
        path: 'tickets',
        component: AllTicketsComponent
      },
      {
        path: 'milestone',
        component: MilestoneComponent
      },
      {
        path: 'activity',
        component: ActivityComponent
      },
      {
       path: 'appointment' ,
       component: AppointmentComponent
      },
      {
        path: 'metrix/region' ,
        component: RegionComponent
       }
    ]
  }

  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageEnterpriseRoutingModule { }
