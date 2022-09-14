import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LabelsService } from '@services/labels.service';
import { ValidationsService } from '@services/validations.service';
import { UploadService } from '@services/upload.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilityService } from '@services/utility.service';
import { EnterpriseApiService } from '@services/enterprise-api.service';
import { ToasterService } from '@services/toaster.service';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageTransform, ImageCroppedEvent, Dimensions } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AdminService } from '@services/admin.service';
import { constant } from '../../storage/constant';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  labelSubcribe: Subscription;
  validationSubscribe: Subscription;
  interCheck: Subscription;
  pathHistorySubscribe: Subscription;

  profileForm: FormGroup;

  openSelect: boolean;
  isDirty: boolean;
  showCropModal: boolean;
  showAboutError: boolean;
  showBPError: boolean;
  showBusinessPhoneAfterBind: boolean;

  isDisable: boolean = true;
  isBusinessEmail: boolean = true;
  showCropper: boolean = false;
  containWithinAspectRatio: boolean = false;

  pathHistory: string;
  cancelButtonUrl: string;
  appiyoDriveImageId: string;
  imageFileName: string;
  showBPMsg: string;

  country: string = "in";
  countryCode: string = "91";
  setCountryFlag: string = 'in';
  getSymbol: string = 'INR';

  money: number;
  selectedCar: number;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;

  labels: any;
  validations: any;
  localUrl: any = 'assets/image/peacock.png';
  url: any = 'assets/image/peacock.png';
  imageChangedEvent: any = '';
  croppedImage: any = '';

  transform: ImageTransform = {};
  fileCrop: File;

  phoneTimeout: any;
  constant: any;
  getAccountNumberValidation: {
    rule?: any;
    msg?: string;
  }[];

  getCreditCardNumberValidation: {
    rule?: any;
    msg?: string;
  }[];

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
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.money = 1980;

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
        this.cancelButtonUrl = 'pages/dashboard';
      } else if (this.pathHistory === 'fromOnboard') {
        this.cancelButtonUrl = 'pages/enterprises/onboard';
      } else {
        this.cancelButtonUrl = 'pages/enterprises/onboard';
      }
    });

    this.onFormInit();

    this.getAccountNumberValidation = this.accountNumberValidation();
    this.getCreditCardNumberValidation = this.creditCardNumberValidation();

    this.constant = constant;

    const gotProfileData = this.adminService.getProfileData();
    console.log('gotProfileData', gotProfileData);
    if (Object.keys(gotProfileData).length === 0) {
      this.getRetailerStatus();
    }
    this.setFormValue(gotProfileData);
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

  onFormInit() {
    this.profileForm = new FormGroup({
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
    });
  }


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
      this.appiyoDriveImageId = data['iconUrl'];
    }

    this.localUrl = 'assets/image/peacock.png';

    this.showBusinessPhoneAfterBind = true;
    this.setCountryFlag = data['country'];

    this.onPatchValue(data, cardNumberData);
    this.showBusinessPhoneAfterBind = true;
  }

  onPatchValue(data, cardNumberData?) {
    this.profileForm.patchValue({
      companyName: data['companyName'] || '',
      industry: data['industry'] || '',
      about: data['about'] || '',
      contactPerson: data['contactPerson'] || '',
      jobTitle: data['jobTitle'] || '',
      businessPhone: data['businessPhone'] || '',
      panNumber: data['PANNumber'] || '',
      tanNumber: data['TANNumber'] || '',
      gstNumber: data['GSTNumber'] || '',
      accountNumber: data['accountNumber'] || '',
      cardNumber: cardNumberData || '',
      ifscCode: data['IFSCCode'] || '',
      businessEmailAddress: data['businessOwnerEmail'] || ''
    });
  }


  goToDashboard() {
    this.router.navigateByUrl('pages/dashboard')
  }

  async onCreateEnterprise() {
    if (
      this.profileForm.invalid
      || this.profileForm.get('businessPhone').value.length < 7
      || this.showBPError
    ) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all required fields', '')
      return;
    }

    const formValue = this.profileForm.getRawValue();
    console.log('Profile Form value', formValue);
    const data = { ...formValue };

    const getProperCardNumber = this.profileForm.value.cardNumber.replace(/-+/g, "");
    const removeSpaceInCardNumber = String(getProperCardNumber).replace(/ +/g, "");

    let formData = {
      companyName: data.companyName,
      industry: data.industry,
      about: data.about,
      contactPerson: data.contactPerson,
      jobTitle: data.jobTitle,
      businessPhone: data.businessPhone,
      panNumber: data.PANNumber,
      tanNumber: data.TANNumber,
      gstNumber: data.GSTNumber,
      accountNumber: data.accountNumber,
      cardNumber: removeSpaceInCardNumber,
      ifscCode: data.IFSCCode,
      countryCode: this.countryCode,
      country: this.country,
      activate: true,
      password: "twixor@123",
      iconUrl: this.appiyoDriveImageId,
      logo: this.appiyoDriveImageId
    }

    let response;
    try {
      const aggregatorInformation = [{ ...formData }]
      // response = await this.enterpriseApiService.saveProfileDetails(aggregatorInformation);
      console.log('onBoardEnterprise', response)

      const appiyoError = response.Error;
      const apiError = response.ProcessVariables?.error?.code;
      const errorMessage = response.ProcessVariables?.error?.message;

      if (appiyoError === '0' && apiError === '0') {
        this.isDirty = false;
        this.localUrl = 'assets/image/peacock.png';
        this.toasterService.showSuccess('Saved Successfully !', 'Profile Details');
      } else {
        if(errorMessage === undefined){
          return;
        }
        this.toasterService.showError(errorMessage == undefined ? 'Error' : errorMessage,'Profile Details');
      }

    } catch (err) {
      console.log("Error", err);
      // this.toasterService.showError('Enterprise Onboard API Failed','');
    }

  }

  async getRetailerStatus() {
    const response: any = await this.enterpriseApiService.getRetailerStatus();

    console.log('getRetailerStatus', response);

    const appiyoError = response.Error;
    const apiError = response.ProcessVariables?.error?.code;
    const errorMessage = response.ProcessVariables?.error?.message;

    if (appiyoError === '0' && apiError === '0') {
      const aggregatorDetails = response?.ProcessVariables?.aggregatorDetails;
      this.adminService.setProfileData(aggregatorDetails[0]);
      const gotProfileData = this.adminService.getProfileData();
      this.setFormValue(gotProfileData);
    } else {
      if(errorMessage === undefined){
        return;
      }
      this.toasterService.showError(errorMessage == undefined ? 'Error' : errorMessage, 'Retailer status')
    }
  }


  onCancel() {
    this.router.navigateByUrl(`${this.cancelButtonUrl}`);
  }

  detectAboutData(event) {
    const data = event.target.value;

    if (data.length > 0 && data.length > 500) {
      const substrData = String(data).substring(0, 500);
      this.profileForm.patchValue({
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
    let removeSpaceInBusPh: string;
    removeSpaceInBusPh = String(event.target.value).replace(/ +/g, "");
    removeSpaceInBusPh = String(removeSpaceInBusPh).replace('+', "");
    removeSpaceInBusPh = String(removeSpaceInBusPh).replace('(', "");
    removeSpaceInBusPh = String(removeSpaceInBusPh).replace(')', "");
    removeSpaceInBusPh = String(removeSpaceInBusPh).replace(/-/g, "");

    if (removeSpaceInBusPh.length < 7
      && removeSpaceInBusPh.length > 0) {
      this.showBPError = true;
      this.showBPMsg = 'Please enter minimum 7 digit phone number'
    } else if (!Number(removeSpaceInBusPh)) {
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
      resolve(uploadResponse);
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
    return;
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
    console.log('this.fileCrop', this.fileCrop);

    let response = await this.uploadToAppiyoDrive(this.fileCrop);
    console.log("Upload Response", response);
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
    const fileType = this.dataURLtoFile(this.croppedImage, `${this.imageFileName}-${new Date().getTime()}.png`);
    console.log('File Type', fileType);
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

  cardNumberChange(event) {
    let cardNumber = event.target.value;
    const value = String(cardNumber);

    if (value.length > this.validations?.validationData.cardNumber.maxLength.rule) {
      const substrValue = value.substring(0, (this.validations?.validationData.cardNumber.maxLength.rule - 1));
      const data = value.replace(value, String(substrValue));

      this.profileForm.patchValue({
        cardNumber: data
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
      this.profileForm.patchValue({
        cardNumber: outputString
      });
    }
  }

}
