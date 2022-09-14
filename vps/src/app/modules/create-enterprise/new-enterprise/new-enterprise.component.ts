import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LabelsService } from '@services/labels.service';
import { ValidationsService } from '@services/validations.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UploadService } from '@services/upload.service'
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";

import { UtilityService } from '@services/utility.service';
import { EnterpriseApiService } from '@services/enterprise-api.service';
import { ToasterService } from '@services/toaster.service';

import { Dimensions, ImageCroppedEvent, ImageTransform, base64ToFile } from 'ngx-image-cropper';

import { constant } from '../../../storage/constant'

@Component({
  selector: 'app-new-enterprise',
  templateUrl: './new-enterprise.component.html',
  styleUrls: ['./new-enterprise.component.css']
})
export class NewEnterpriseComponent implements OnInit, OnDestroy {

  labelSubcribe: Subscription;
  validationSubscribe: Subscription;
  interCheck: Subscription;
  pathHistorySubscribe: Subscription;

  openSelect: boolean;
  isDirty: boolean;
  enterpriseForm: FormGroup;
  showType: string = 'add';

  labels: any;
  validations: any;
  selectedCar: number;


  localUrl: any = 'assets/image/peacock.png';
  showCropModal: boolean;
  pathHistory: string;
  cancelButtonUrl: string;
  country: string = "in";
  countryCode: string = "91";

  setCountryFlag: string = 'in';

  isDisable: boolean;

  appiyoDriveImageId: string;

  getAccountNumberValidation: {
    rule?: any;
    msg?: string;
  }[];

  getCreditCardNumberValidation: {
    rule?: any;
    msg?: string;
  }[];


  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};


  imageFileName: string;

  showBusinessPhoneAfterBind: boolean;

  showAboutError: boolean;

  showBPMsg: string;
  showBPError: boolean;
  showLogoErr: boolean;

  isBusinessEmail: boolean;

  constant: any;

  showModal: boolean;
  cardNumberPatchTimeout: any;
  apiValue = {};

  inputDataModal: {
    title: string;
    content: string;
  }


  constructor(
    private router: Router,
    private labelsService: LabelsService,
    private validationsService: ValidationsService,
    private uploadService: UploadService,
    private httpClient: HttpClient,
    private domSanitizer: DomSanitizer,
    private utilityService: UtilityService,
    private enterpriseApiService: EnterpriseApiService,
    private toasterService: ToasterService,
    private activatedRoute: ActivatedRoute
  ) { }


  keyword = 'name';


  url: any = 'assets/image/peacock.png';

  money: number;
  getSymbol: string = 'INR';

  fileCrop: File;

  enterpriseId: string;



  ngOnInit(): void {
    this.money = 1980;
    this.labelSubcribe = this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
      console.log('Labels', this.labels)
    });

    this.validationSubscribe = this.validationsService.getValidationsData().subscribe((values) => {
      this.validations = values;
    });

    this.activatedRoute.params.subscribe((data) => {
      this.enterpriseId = data['enterpriseId']
    })

    this.pathHistorySubscribe = this.utilityService.createEnterprisePathHistory$.subscribe((path: string) => {
      this.pathHistory = path;
      if (this.pathHistory === 'fromDashboard') {
        this.cancelButtonUrl = 'pages/dashboard';
      } else if (this.pathHistory === 'fromOnboard') {
        this.cancelButtonUrl = 'pages/enterprises/onboard';
      } else {
        this.cancelButtonUrl = 'pages/enterprises/onboard';
      }
    })


    this.enterpriseForm = new FormGroup({
      companyName: new FormControl(''),
      industry: new FormControl('', Validators.required),
      about: new FormControl(''),
      contactPerson: new FormControl(''),
      jobTitle: new FormControl(''),
      businessPhone: new FormControl(''),
      panNumber: new FormControl(''),
      tanNumber: new FormControl(''),
      gstNumber: new FormControl(''),
      accountNumber: new FormControl(''),
      cardNumber: new FormControl(''),
      ifscCode: new FormControl(''),
      businessEmailAddress: new FormControl('')
    })

    this.getAccountNumberValidation = this.accountNumberValidation();

    this.getCreditCardNumberValidation = this.creditCardNumberValidation();

    this.constant = constant;

    if (this.enterpriseId) {
      this.showType = 'view';
      this.isDisable = true;
      this.isBusinessEmail = true;
      // this.getEnterpriseDetails()
    } else {
      this.showBusinessPhoneAfterBind = true;
    }

  }

  accountNumberValidation() {

    const accountNumber = [
      {
        rule: (data) => {
          return Number(data) ? false : true;
        },
        msg: 'Please provide valid account number',
      },
      {
        rule: (data) => {

          const checkLength = String(data).length;
          return checkLength < 8 ? true : false;
        },
        msg: 'Please provide minimum 8 digit account number',
      }
    ];
    return accountNumber;

  }

  creditCardNumberValidation() {

    const creditCardNumber = [
      {
        rule: (data) => {

          const getProperCardNumber = String(data).replace(/-+/g, "");
          const removeSpaceInCardNumber = String(getProperCardNumber).replace(/ +/g, "");

          const creditValid = Number(removeSpaceInCardNumber) ? false : true;
          return creditValid;
        },
        msg: 'Please provide valid card number',
      },
      {
        rule: (data) => {

          const checkLength = String(data).length;
          return checkLength < 16 ? true : false;
        },
        msg: 'Please provide minimum 13 digit credit card number',
      }
    ];
    return creditCardNumber;

  }

  // async getEnterpriseDetails() {


  //   const enterpriseIdData: any = await this.enterpriseApiService.fetchParticularEnterpriseId(this.enterpriseId);

  //   console.log('Enterprise Data', enterpriseIdData)

  //   const apiError = enterpriseIdData.Error;
  //   const apiResponse = enterpriseIdData.ProcessVariables;
  //   const errorMessage = apiResponse.error.message;

  //   if (apiResponse.error.code == '0' && apiError == '0') {
  //     const enterpriseData = apiResponse.enterpriseDetail;
  //     this.apiValue = enterpriseData;

  //     this.setFormValue(enterpriseData)
  //   } else {
  //     if (errorMessage === undefined) {
  //       return;
  //     }
  //     this.toasterService.showError(apiResponse.error.message, '')
  //   }

  // }



  setFormValue(data) {
    const removeSpaceInCardNumber = String(data['cardNumber']).replace(/ +/g, "");

    const words = String(removeSpaceInCardNumber).split('');

    let cardNumberData = '';
    for (let i = 0; i < words.length; i++) {

      if (i > 0 && i % 4 == 0) {
        cardNumberData += "-"
      }
      cardNumberData += words[i];

    }

    if (data['logo']) {
      let dataUrl = `${environment.host}${environment.driveLocation}${data['logo']}`
      this.localUrl = dataUrl;
      this.appiyoDriveImageId = data['logo']
    }

    if (data['iconUrl']) {
      let dataUrl = `${environment.host}${environment.driveLocation}${data['iconUrl']}`
      this.localUrl = dataUrl;
      this.appiyoDriveImageId = data['iconUrl']
    }

    this.showBusinessPhoneAfterBind = true;
    this.setCountryFlag = data['country'] || 'in';
    this.country = data['country'] || 'in';
    this.countryCode = data['countryCode'] || '91';

    this.enterpriseForm.patchValue({
      companyName: data['enterpriseName'] || '',
      industry: data['industry'] || '',
      about: data['about'] || '',
      contactPerson: data['contactPerson'] || '',
      jobTitle: data['jobTitleRole'] || '',
      businessPhone: data['businessPhone'] || '',
      panNumber: data['panNumber'] || '',
      tanNumber: data['tanNumber'] || '',
      gstNumber: data['gstNumber'] || '',
      accountNumber: data['accountNumber'] || '',
      cardNumber: cardNumberData || '',
      ifscCode: data['ifscCode'] || '',
      businessEmailAddress: data['emailId'] || ''
    })

  }


  goToDashboard() {
    this.router.navigateByUrl('pages/dashboard')
  }

  selectEvent(item) {
    // do something with selected item
    console.log(item);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log(val);
  }

  onFocused(e) {
    // do something when input is focused
    console.log(e);
  }

  // async onCreateEnterprise() {
  //   console.log(this.enterpriseForm.value)


  //   if (this.enterpriseForm.invalid || this.enterpriseForm.get('businessPhone').value.length < 7 || this.showBPError || !this.appiyoDriveImageId) {

  //     if (!this.appiyoDriveImageId) {
  //       this.showLogoErr = true;
  //     } else {
  //       this.showLogoErr = false;
  //     }

  //     this.isDirty = true;
  //     this.toasterService.showError('Please fill all required fields', '')
  //     return;
  //   }



  //   const getProperCardNumber = this.enterpriseForm.value.cardNumber.replace(/-+/g, "");
  //   const removeSpaceInCardNumber = String(getProperCardNumber).replace(/ +/g, "");

  //   let data = {
  //     "companyName": this.enterpriseForm.value.companyName,
  //     "industry": this.enterpriseForm.value.industry,
  //     "about": this.enterpriseForm.value.about,
  //     "contactPerson": this.enterpriseForm.value.contactPerson,
  //     "jobTitleRole": this.enterpriseForm.value.jobTitle,
  //     "businessPhone": this.enterpriseForm.value.businessPhone,
  //     "panNumber": this.enterpriseForm.value.panNumber,
  //     "tanNumber": this.enterpriseForm.value.tanNumber,
  //     "gstNumber": this.enterpriseForm.value.gstNumber,
  //     "accountNumber": this.enterpriseForm.value.accountNumber,
  //     "cardNumber": removeSpaceInCardNumber,
  //     "ifscCode": this.enterpriseForm.value.ifscCode,
  //     "countryCode": this.countryCode,
  //     "country": this.country,
  //     "activate": true,
  //     "password": "twixor@123",
  //     "iconUrl": this.appiyoDriveImageId,
  //     "logo": this.appiyoDriveImageId,
  //     "emailId": this.enterpriseForm.value.businessEmailAddress
  //   }

  //   console.log("Result obj", data);

  //   let onBoardEnterprise;
  //   try {
  //     onBoardEnterprise = await this.enterpriseApiService.onBoardEnterprise(data);
  //     console.log('onBoardEnterprise', onBoardEnterprise)

  //     const apiError = onBoardEnterprise.Error;

  //     const apiResponse = onBoardEnterprise.ProcessVariables;
  //     const errorMessage = onBoardEnterprise.ProcessVariables.error.message;

  //     if (apiResponse.error.code == '0' && apiError == '0') {

  //       this.isDirty = false;
  //       this.enterpriseForm.reset()
  //       this.localUrl = 'assets/image/peacock.png';
  //       this.toasterService.showSuccess('Enterprise Created Successfully', '')
  //       this.router.navigateByUrl('pages/enterprises/onboard')
  //     } else {
  //       if (errorMessage === undefined) {
  //         return;
  //       }
  //       this.toasterService.showError(apiResponse.error.message, '')
  //     }

  //   } catch (err) {
  //     console.log("Error", err);
  //     // this.toasterService.showError('Enterprise Onboard API Failed','');
  //   }

  // }

  // async onUpdateEnterprise() {
  //   if (this.enterpriseForm.invalid || this.enterpriseForm.get('businessPhone').value.length < 7 || this.showBPError) {
  //     this.isDirty = true;
  //     this.toasterService.showError('Please fill all required fields', '')
  //     return;
  //   }

  //   const getProperCardNumber = this.enterpriseForm.value.cardNumber.replace(/-+/g, "");
  //   const removeSpaceInCardNumber = String(getProperCardNumber).replace(/ +/g, "");

  //   const data = {
  //     "enterpriseId": this.enterpriseId,
  //     "enterpriseName": this.enterpriseForm.value.companyName,
  //     "industry": this.enterpriseForm.value.industry,
  //     "about": this.enterpriseForm.value.about,
  //     "contactPerson": this.enterpriseForm.value.contactPerson,
  //     "jobTitleRole": this.enterpriseForm.value.jobTitle,
  //     "businessPhone": this.enterpriseForm.value.businessPhone,
  //     "panNumber": this.enterpriseForm.value.panNumber,
  //     "tanNumber": this.enterpriseForm.value.tanNumber,
  //     "gstNumber": this.enterpriseForm.value.gstNumber,
  //     "accountNumber": this.enterpriseForm.value.accountNumber,
  //     "cardNumber": removeSpaceInCardNumber,
  //     "ifscCode": this.enterpriseForm.value.ifscCode,
  //     "countryCode": this.countryCode,
  //     "country": this.country,
  //     "activate": true,
  //     "password": "twixor@123",
  //     "iconUrl": this.appiyoDriveImageId,
  //     "logo": this.appiyoDriveImageId,
  //     "emailId": this.enterpriseForm.value.businessEmailAddress

  //   }
  //   const response: any = await this.enterpriseApiService.updateEnterpriseDetails(data)

  //   console.log('enterprise update', response)

  //   const apiError = response.Error;

  //   const apiResponse = response.ProcessVariables;
  //   const errorMessage = response.ProcessVariables.error.message;

  //   if (apiResponse.error.code == '0' && apiError == '0') {
  //     this.isDisable = true;
  //     this.showModal = false;
  //     this.showType = 'view'
  //     this.toasterService.showSuccess(apiResponse.error.message, '')
  //   } else {
  //     if (errorMessage === undefined) {
  //       return;
  //     }
  //     this.toasterService.showError(apiResponse.error.message, '')
  //   }

  // }

  onEditEnterprise() {
    this.showType = 'update';
    this.isDisable = false;
  }

  onCancel() {
    this.router.navigateByUrl(`${this.cancelButtonUrl}`);
  }

  detectAboutData(event) {

    const data = event.target.value;

    if (data.length > 0 && data.length > 500) {

      const substrData = String(data).substring(0, 500);
      this.enterpriseForm.patchValue({
        about: substrData
      })
      this.showAboutError = true;
      setTimeout(() => {
        this.showAboutError = false;
      }, 3000)
    } else {
      this.showAboutError = false;
    }
  }

  detectBusinessPhone(event) {

    let removeSpaceInBusPh = String(event.target.value).replace(/ +/g, "");

    removeSpaceInBusPh = String(removeSpaceInBusPh).replace('+', "");
    removeSpaceInBusPh = String(removeSpaceInBusPh).replace('(', "");
    removeSpaceInBusPh = String(removeSpaceInBusPh).replace(')', "");
    removeSpaceInBusPh = String(removeSpaceInBusPh).replace(/-/g, "");

    if (removeSpaceInBusPh.length < 7 && removeSpaceInBusPh.length > 0) {
      this.showBPError = true;
      this.showBPMsg = 'Please enter minimum 7 digit phone number'
    } else if (!Number(removeSpaceInBusPh) && removeSpaceInBusPh.length > 0) {
      this.showBPError = true;
      this.showBPMsg = 'Please enter valid number'
    } else {
      this.showBPMsg = ''
      this.showBPError = false;
    }
  }


  /** UPLOAD APPIYO DRIVE  START*/


  uploadToAppiyoDrive(file: File) {
    return new Promise(async (resolve, reject) => {

      const modifiedFile : any = Object.defineProperty(file, 'name', {
        writable: true,
        value: file.name
      });
      modifiedFile.name = `${new Date().getTime()}-${modifiedFile.name}`;
      const uploadResponse = await this.uploadService.uploadToAppiyoDrive(modifiedFile);
      resolve(uploadResponse)

    })
  }

  /** UPLOAD APPIYO DRIVE END */


  /** Image Select */

  async onFileSelect(event) {

    console.log(event)

    const file: File = event.target.files[0];

    this.imageFileName = file.name.split('.')[0];

    this.imageChangedEvent = event;
    this.showCropModal = true;

  }


  onSelectFile(event) { // called each time file input changes

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        this.localUrl = event.target.result;
      }
    }


  }

  /** CROP IMAGE */

  async uploadCropImage() {

    console.log(this.fileCrop)
    let response = await this.uploadToAppiyoDrive(this.fileCrop);

    console.log("Upload Response", response)

    if (response['info']) {
      let dataUrl = `${environment.host}${environment.driveLocation}${response['info']['id']}`
      this.localUrl = dataUrl;
      this.appiyoDriveImageId = response['info']['id'];

      this.showCropModal = false;
      this.showCropper = false;
      console.log('Local URL', this.localUrl)
    }
  }


  /** GET DOCS DRIVE PATH LOCATION */

  loadImage(url: string): Observable<any> {
    return this.httpClient
      .get(url, { responseType: 'blob' })
      .pipe(map((e) => {

        this.url = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e))
      }));
  }


  dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }



  clearCrop() {
    this.showCropModal = false;
    this.showCropper = false;
    // this.localUrl = 'assets/image/peacock.png';
  }

  ngOnDestroy() {
    this.labelSubcribe.unsubscribe();
    this.validationSubscribe.unsubscribe();
    this.pathHistorySubscribe.unsubscribe();
    clearTimeout(this.cardNumberPatchTimeout);
  }

  telInputObject(obj) {
    console.log(obj['j']);
    const code = obj['j'];
    obj.setCountry(code);
  }

  getNumber(e) {
    console.log("getNumber");
    console.log(e);
  }

  onCountryChange(e) {
    console.log("Country", e)
    this.country = e.iso2;
    this.countryCode = e.dialCode;
  }


  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // console.log(event, base64ToFile(event.base64));

    // console.log('Cropped Image ******',event)

    const fileType = this.dataURLtoFile(this.croppedImage, `${this.imageFileName}-${new Date().getTime()}.png`)

    console.log('File Type', fileType)

    this.fileCrop = fileType;
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }


  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  onEnterpriseProvision() {
    this.utilityService.setCreateEnterprisePathHistory(`${this.pathHistory}`);
    this.router.navigateByUrl(`pages/dashboard/enterprise-provisioning/${this.enterpriseId}`);
  }

  cardNumberChange(event) {

    let cardNumber = event.target.value;
    const value = String(cardNumber);
    const maxLength = this.validations?.validationData.cardNumber.maxLength.rule;

    if (value.length > maxLength) {

      const substrValue = value.substring(0, (maxLength));
      this.cardNumberPatchTimeout = setTimeout(() => {
        this.enterpriseForm.patchValue({
          cardNumber: substrValue
        });
      });

    } else {
      cardNumber = cardNumber.replace(/-+/g, "");
      const words = String(cardNumber).split('');
      let outputString = '';
      for (let i = 0; i < words.length; i++) {
        if (i > 0 && i % 4 == 0) {
          outputString += "-"
        }
        outputString += words[i];
      }
      this.enterpriseForm.patchValue({
        cardNumber: outputString
      });
    }
  }

  showConfirmModal() {
    this.showModal = true;
    this.inputDataModal = {
      title: 'Enterprise Information',
      content: 'Are you sure you want to save enterprise information?'
    }
  }

  closeModal() {
    this.showModal = false;
  }

}
