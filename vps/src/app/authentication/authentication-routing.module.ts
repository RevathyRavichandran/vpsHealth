import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AlertModalComponent } from '../modules/shared/alert-modal/alert-modal.component'

const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
  path: 'login',
  component: LoginComponent,
  children: [{
    path:'fail',
    component: AlertModalComponent
  }]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
