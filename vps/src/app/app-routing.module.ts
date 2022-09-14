import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertModalComponent } from './modules/shared/alert-modal/alert-modal.component';
import { LoginAuthGuard } from './guard/login-auth.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [LoginAuthGuard],
    loadChildren: () => import('src/app/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('src/app/modules/container/container.module').then(m => m.ContainerModule),
  },
  // {
  //   path: 'matrix',
  //   loadChildren: () => import('src/app/matrix/matrix.module').then(m => m.MatrixModule),
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
