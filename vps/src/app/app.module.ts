import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { MenuBarComponent } from '@shared/menu-bar/menu-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import  { AuthInterceptorService } from './services/auth-interceptor.service';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ManageEnterpriseModule } from './modules/manage-enterprise/manage-enterprise.module';

import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';

import {Ng2TelInputModule} from 'ng2-tel-input';

import { ImageCropperModule } from 'ngx-image-cropper';

import { HashLocationStrategy, LocationStrategy, DatePipe } from '@angular/common';
import { ProfileModule } from './modules/profile/profile.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    // MenuBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
    FormsModule,
    ChartsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    ManageEnterpriseModule,
    NgSelectModule,
    Ng2TelInputModule,
    ImageCropperModule,
    ProfileModule,
    NgbModule,
    ToastrModule.forRoot({
      // preventDuplicates: true,
      // positionClass:'toast-top-center'
    }),
  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
