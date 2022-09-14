import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageEnterpriseRoutingModule } from './manage-enterprise-routing.module';

import { MilestoneComponent } from './milestone/milestone.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ManageEnterpriseComponent } from './manage-enterprise.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '@shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Daterangepicker } from 'ng2-daterangepicker';
import { ActivityComponent } from './activity/activity.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { RegionComponent } from 'src/app/matrix/region/region.component';
import { MatTableModule } from '@angular/material/table';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    MilestoneComponent, 
    RegionComponent,
    AllTicketsComponent, 
    VisitorsComponent, 
    FeedbackComponent, 
    ManageEnterpriseComponent, ActivityComponent, AppointmentComponent
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageEnterpriseRoutingModule,
    NgxPaginationModule,
    SharedModule,
    Daterangepicker,
    SharedModule,
    MatTableModule
  ]
})
export class ManageEnterpriseModule { }
