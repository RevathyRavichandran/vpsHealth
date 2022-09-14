import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { LabelsService } from '@services/labels.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationsService } from '@services/validations.service'
import { EnterpriseApiService } from '@services/enterprise-api.service';
import { ToasterService } from '@services/toaster.service';
import { constant } from '../../../storage/constant';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-enterprise-provisioning',
  templateUrl: './enterprise-provisioning.component.html',
  styleUrls: ['./enterprise-provisioning.component.css']
})
export class EnterpriseProvisioningComponent implements OnInit, OnDestroy {

  labels: any;
  validations: any;
  enterpriseProvisionData: any;
  constant: any = [];

  isDirty: boolean;
  isPlanChecked: boolean;

  enterpriseId: number;

  labelSubcribe: Subscription;
  validationSubscribe: Subscription;

  enterpriseProvisionForm: FormGroup;

  pathHistorySubscribe: Subscription;

  pathHistory: string;
  buttonUrl: string;

  showModal: boolean;

  inputDataModal: {
    title: string;
    content:string;
  }

  constructor(
    private router: Router,
    private labelsService: LabelsService,
    private validationsService: ValidationsService,
    private activatedRoute: ActivatedRoute,
    private enterpriseApiService: EnterpriseApiService,
    private toasterService: ToasterService,
    private utilityService: UtilityService
  ) {
    console.log('constant', constant);
    this.constant = constant;
  }

  ngOnInit(): void {

    this.labelSubcribe = this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
      console.log('Labels', this.labels)
    });

    this.validationSubscribe = this.validationsService.getValidationsData().subscribe((values) => {
      this.validations = values;
    });

    this.pathHistorySubscribe = this.utilityService.createEnterprisePathHistory$.subscribe((path: string) => {
      this.pathHistory = path;
      if (this.pathHistory === 'fromDashboard') {
        this.buttonUrl = 'pages/dashboard';
      } else if (this.pathHistory === 'fromOnboard') {
        this.buttonUrl = 'pages/enterprises/onboard';
      } else {
        this.buttonUrl = 'pages/enterprises/onboard';
      }
    })

    console.log('params', this.activatedRoute.snapshot.params.id);
    this.enterpriseId = Number(this.activatedRoute.snapshot.params.id);
    this.onFormInit();
    // this.getEnterpriseProvision();

  }

  onFormInit() {
    this.enterpriseProvisionForm = new FormGroup({
      enterpriseName: new FormControl('', Validators.required),
      plan: new FormControl(null, Validators.required),
      businessOwnerEmail: new FormControl('', Validators.required),
      accountStatus: new FormControl('', Validators.required),
      paymentType: new FormControl('', Validators.required),
      billingType: new FormControl('', Validators.required)
    });
  }

  // async getEnterpriseProvision() {
  //   const enterpriseProvision: any = await this.enterpriseApiService.getEnterpriseProvision(
  //     this.enterpriseId
  //   );
  //   console.log('Selected EnterpriseList', enterpriseProvision);

  //   const appiyoError = enterpriseProvision.Error;
  //   const apiError = enterpriseProvision.ProcessVariables?.error?.code;
  //   const errorMessage = enterpriseProvision.ProcessVariables?.error?.message;

  //   if (appiyoError === '0' && apiError === '0') {
  //     const response = enterpriseProvision.ProcessVariables.enterpriseProvisioningDetails;
  //     this.enterpriseProvisionData = response;
  //     this.patchFormValues(response);
  //     console.log('enterpriseProvisionList', response);
  //   } else {
  //     if(errorMessage === undefined){
  //       return;
  //     }
  //     this.toasterService.showError(errorMessage, 'Enterprise Provision');
  //   }
  // }

  patchFormValues(data) {
    console.log('data', data)
    this.enterpriseProvisionForm.patchValue({
      enterpriseName: data.enterpriseName,
      plan: String(data.planTypeId),
      businessOwnerEmail: data.businessOwnerEmailId,
      paymentType: data.paymentTypeId || null,
      accountStatus: data.accountStatusId || null,
      billingType: data.billingTypeId || null
    });
    console.log('test', this.enterpriseProvisionForm.controls.plan.value)
    const planType = this.enterpriseProvisionForm.controls.plan.value;
    this.isPlanChecked = planType == 'undefined' ? true : false;
  }

  // async onPlanTypeSelected(event) {
  //   this.isPlanChecked = false;
  //   const planId = event.target.value;
  //   console.log('planId', planId);

  //   const response: any = await this.enterpriseApiService.getEnterpriseProvisionPlanType(planId);
  //   console.log(response);

  //   const appiyoError = response.Error;
  //   const apiError = response.ProcessVariables?.error?.code;
  //   const errorMessage = response.ProcessVariables?.error?.message;

  //   if (appiyoError === '0' && apiError === '0') {
  //     this.enterpriseProvisionData.journey = response.ProcessVariables.planTypeLimitDetails[0].journey;
  //     this.enterpriseProvisionData.camapaign = response.ProcessVariables.planTypeLimitDetails[0].camapaign;
  //     this.enterpriseProvisionData.encap = response.ProcessVariables.planTypeLimitDetails[0].encaps;
  //     this.enterpriseProvisionData.agent = response.ProcessVariables.planTypeLimitDetails[0].agent;

  //   } else {
  //     if(errorMessage === undefined){
  //       return;
  //     }
  //     this.toasterService.showError(errorMessage, 'Enterprise Provision');
  //   }

  // }

  // async onSave() {
  //   this.isDirty = true;
  //   let valid: boolean = this.enterpriseProvisionForm.valid;

  //   if (!valid) {
  //     this.toasterService.showError('Please fill all required fields', 'Enterprise Provision');
  //     return;
  //   }

  //   const formValue = this.enterpriseProvisionForm.getRawValue();
  //   console.log('Enterprise Provision Form value', formValue);
  //   const data = { ...formValue };

  //   let FormData = {
  //     planTypeId: Number(data.plan),
  //     accountStatusId: Number(data.accountStatus),
  //     paymentTypeId: Number(data.paymentType),
  //     enterpriseName: data.enterpriseName,
  //     businessOwnerEmailId: data.businessOwnerEmail,
  //     billingTypeId: Number(data.billingType)
  //   }

  //   const enterpriseProvisioningDetails = [{ ...FormData }];

  //   const saveEnterpriseProvision: any = await this.enterpriseApiService.saveEnterpriseProvision(
  //     enterpriseProvisioningDetails,
  //     this.enterpriseId
  //   );
    
  //   const appiyoError = saveEnterpriseProvision.Error;
  //   const apiError = saveEnterpriseProvision.ProcessVariables?.error?.code;
  //   const errorMessage = saveEnterpriseProvision.ProcessVariables?.error?.message;

  //   this.showModal = false;

  //   if (appiyoError === '0' && apiError === '0') {
  //     this.toasterService.showSuccess('Saved successfully!', 'Enterprise Provision');
  //     this.router.navigateByUrl(`${this.buttonUrl}`)
  //   } else {
  //     if(errorMessage === undefined){
  //       return;
  //     }
  //     this.toasterService.showError(errorMessage, 'Enterprise Provision');
  //   }


  // }

  onCancel() {
    this.router.navigateByUrl(`pages/enterprise/${this.enterpriseId}`);
  }

  ngOnDestroy() {
    this.labelSubcribe.unsubscribe();
    this.validationSubscribe.unsubscribe();
    this.pathHistorySubscribe.unsubscribe();
  }


  showConfirmModal() {

    this.showModal = true;

    this.inputDataModal = {
      title: 'Enterprise Provisioning',
      content: 'Are you sure you want to save enterprise provisioning data?'
    }
  }

  closeModal() {

    this.showModal = false
  }

}
