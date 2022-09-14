import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { ContainerComponent } from './container/container.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ContainerComponent],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    SharedModule
  ]
})
export class ContainerModule { }
