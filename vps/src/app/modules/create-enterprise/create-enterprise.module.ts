import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEnterpriseRoutingModule } from './create-enterprise-routing.module';
import { NewEnterpriseComponent } from './new-enterprise/new-enterprise.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { SecurePipe } from './secure.pipe';

import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [NewEnterpriseComponent, SecurePipe],
  imports: [
    CommonModule,
    CreateEnterpriseRoutingModule,
    SharedModule,
    AutocompleteLibModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    Ng2TelInputModule,
    ImageCropperModule
  ], 
  exports:[
    SecurePipe
  ]
})
export class CreateEnterpriseModule { }
