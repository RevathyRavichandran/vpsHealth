import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '@shared/shared.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SecurePipe } from '../profile/secure.pipe';


@NgModule({
  declarations: [ProfileComponent, SecurePipe],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    NgSelectModule,
    Ng2TelInputModule,
    ImageCropperModule
  ]
})
export class ProfileModule { }
