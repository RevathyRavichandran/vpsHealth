import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEnterpriseComponent } from './new-enterprise/new-enterprise.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    canActivate:[AuthGuard],
    component: NewEnterpriseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEnterpriseRoutingModule { }
