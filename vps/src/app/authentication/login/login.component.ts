import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '@services/login.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from '@services/toaster.service'
import { Subscription } from 'rxjs';
import { LabelsService } from '@services/labels.service';
import { storage } from 'src/app/storage/storage';
import { ValidationsService } from '@services/validations.service';
import { UtilityService } from '@services/utility.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges, OnDestroy {

  loginForm: FormGroup;
  labelSubcribe: Subscription;
  validationSubscribe: Subscription;
  showAlertModal: boolean;
  isDirty: boolean;
  labels: any = {};
  validations: any = {};

  isLoginRequried: boolean;

  inputModal: {
    title: string;
    content: string;
    okLabel: string;
    cancelLabel: string;
  }

  constructor(
    private router: Router,
    private labelsService: LabelsService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private validationsService: ValidationsService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.isLoginRequried = true;

    this.labelSubcribe = this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
      console.log('Labels', this.labels);
    });

    this.validationSubscribe = this.validationsService.getValidationsData().subscribe((values) => {
      this.validations = values;
    });

    this.loginForm = this.formBuilder.group({
      userName: [null],
      password: [null]
    })
  }

  ngOnChanges() {
    this.showAlertModal = false;
  }

  async login() {
    
    this.isDirty = true;
    if (this.loginForm.invalid) {
      this.loginForm.reset();
      return
    }
   
   

    console.log(this.loginForm.value)
    const data = {
      'email': this.loginForm.value.userName,
      'password': this.loginForm.value.password,
      'long-term-token': true
    }

  
    let getLoginData;
    try {
      getLoginData = await this.loginService.getLoginCredentials(data);
      console.log('getLoginData', getLoginData)
      if (getLoginData['token']) {
        localStorage.setItem('token', getLoginData['token']);
        localStorage.setItem('loginRequired', `${this.isLoginRequried}`);
        localStorage.setItem('roleType', getLoginData['roleType']);
        this.utilityService.setSessionTimeOut(0);
        this.toasterService.showSuccess('Logged In Successfully', '');
        this.router.navigate(['pages/dashboard']);

      }
    } catch (err) {
      console.log("Error", err);
      //this.showAlertModal = true;
      this.toasterService.showError('User Name & Password mismatching', 'Login Failed');
      this.loginForm.reset();
      this.isDirty = false;
    }

  }

  okData() {
    this.showAlertModal = false;
  }

  cancelData() {
    this.showAlertModal = false;
  }

  ngOnDestroy() {
    this.labelSubcribe.unsubscribe();
    this.validationSubscribe.unsubscribe();
  }

}
