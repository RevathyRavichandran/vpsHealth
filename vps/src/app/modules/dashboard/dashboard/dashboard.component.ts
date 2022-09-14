import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '@services/utility.service';
import { EnterpriseApiService } from '@services/enterprise-api.service';
import { ToasterService } from '@services/toaster.service';
import { constant } from '../../../storage/constant';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  enterpriseProvisionList: Array<any> = [];
  itemsPerPage: any;
  page: any;
  totalCount: any;

  searchEnterpriseName: string;
  detectSearchAPI: boolean;

  getPlanType: any;

  searchForm: FormGroup;
  isNoRecord: boolean;

  constructor(
    private route: Router,
    private utilityService: UtilityService,
    private enterpriseApiService: EnterpriseApiService,
    private toasterService: ToasterService
  ) {

    console.log('constant', constant);
    this.getPlanType = constant.plantType;
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchInp: new FormControl('')
    })

    //this.getEnterpriseList();

  }

  OnCreateNewEnterprise() {
    this.route.navigateByUrl('pages/create-enterprise');
    this.utilityService.setCreateEnterprisePathHistory('fromDashboard');
  }

  OnEnterpriseProvision() {
    this.route.navigateByUrl('pages/dashboard/enterprise-provisioning/1');
  }

  // async getEnterpriseList(pageIndex?: any) {
  //   const enterpriseList: any = await this.enterpriseApiService.getOnBoardEnterpriseList(pageIndex);
  //   console.log('enterpriseList', enterpriseList);

  //   const appiyoError = enterpriseList.Error;
  //   const apiError = enterpriseList.ProcessVariables?.error?.code;
  //   const errorMessage = enterpriseList.ProcessVariables?.error?.message;
  //   if (appiyoError === '0' && apiError === '0') {
  //     this.detectSearchAPI = false;
  //     this.itemsPerPage = enterpriseList['ProcessVariables']['perPage'];
  //     let totalPages = enterpriseList['ProcessVariables']['totalPages'];
  //     this.totalCount = Number(this.itemsPerPage) * Number(totalPages);
  //     this.enterpriseProvisionList = enterpriseList['ProcessVariables']['enterpriseDetail'] || [];


  //     // const response = enterpriseList.ProcessVariables;
  //     // this.enterpriseProvisionList = response.enterpriseProvisioning;
  //     console.log('enterpriseProvisionList', this.enterpriseProvisionList);
  //   } else {
  //     if(errorMessage === undefined){
  //       return;
  //     }
  //     this.toasterService.showError(errorMessage, 'Enterprise Provision');
  //   }
  // }

  onPatchEnterprise(enterpriseId: number) {
    this.utilityService.setCreateEnterprisePathHistory('fromDashboard');
    this.route.navigateByUrl(`pages/enterprise/${enterpriseId}`);
  }

  // pageChangeEvent(event) {

  //   this.page = Number(event);
  //   if (!this.searchEnterpriseName) {
  //     this.getEnterpriseList(this.page)
  //   } else {
  //     this.getSearchAPIList(this.page)
  //   }
  // }

  // async searchData(event) {

  //   const searchName = event.target.value;

  //   this.searchEnterpriseName = searchName;

  //   if (searchName.length < 3 && searchName.length != 0) {
  //     this.isNoRecord = false;
  //     return;
  //   }
  //   this.page = 1;

  //   if (this.searchEnterpriseName.length == 0 && this.detectSearchAPI) {
  //     this.getEnterpriseList()
  //   } else if (this.searchEnterpriseName) {
  //     this.getSearchAPIList()
  //   }

  // }


  // async getSearchAPIList(pageIndex?: any) {

  //   let inputData;

  //   inputData = {
  //     enterpriseName: this.searchEnterpriseName,
  //     planTypeId: "",
  //     currentPage: pageIndex ? pageIndex : null
  //   }

  //   console.log(inputData)
  //   // return;
  //   const searchResult: any = await this.enterpriseApiService.onBoardSearchAPI(inputData);

  //   const apiError = searchResult.Error;

  //   const apiResponse = searchResult.ProcessVariables;

  //   if (apiResponse.error.code == '0' && apiError == '0') {

  //     this.detectSearchAPI = true;
  //     this.itemsPerPage = searchResult['ProcessVariables']['perPage'];
  //     let totalPages = searchResult['ProcessVariables']['totalPages'];
  //     this.totalCount = Number(this.itemsPerPage) * Number(totalPages);
  //     this.enterpriseProvisionList = searchResult['ProcessVariables']['enterpriseDetail'] || [];
  //     const noRecord = searchResult['ProcessVariables']['enterpriseDetail'];
  //     this.isNoRecord = noRecord === null ? true : false;


  //   } else {
  //     this.toasterService.showError('Enteprise Dashboard Fetch API Failed', '');
  //   }

  // }

  detectDateProcess(dateVal) {


    const createdOn = this.sendDate(dateVal);

    if (this.getWhichDay(0) == createdOn) {

      return "today";

    } else if (this.getWhichDay(1) == createdOn) {

      return "yesterday";

    } else if (this.getWhichDay(2) == createdOn) {

      return "2 days ago";

    } else if (this.getWhichDay(3) == createdOn) {

      return "3 days ago";

    } else if (this.getWhichDay(4) == createdOn) {
      return "4 days ago";

    } else if (this.getWhichDay(5) == createdOn) {


      return "5 days ago";

    } else if (this.getWhichDay(6) == createdOn) {

      return "6 days ago";

    } else {

      return ''
    }




  }


  getWhichDay(dayAgo: number) {

    let date = new Date()
    const yesterday = new Date(date)
    yesterday.setDate(date.getDate() - dayAgo)
    let day = yesterday.getDate().toString();
    day = Number(day) < 10 ? '0' + day : '' + day;

    let month = (yesterday.getMonth() + 1).toString();
    month = +month < 10 ? '0' + month : month;

    let year = yesterday.getFullYear();
    let output = `${year}-${month}-${day}`

    let finalResult = new Date(output)

    return finalResult.getTime()

  }

  sendDate(date) {
    const dateFormat: Date = new Date(date);
    let year = dateFormat.getFullYear();
    let month = Number(dateFormat.getMonth()) + 1;
    let day = dateFormat.getDate().toString();
    let month1 = month < 10 ? '0' + month.toString() : '' + month.toString(); // ('' + month) for string result

    day = Number(day) < 10 ? '0' + day : '' + day; // ('' + month) for string result

    const formattedDate = year + '-' + month1 + '-' + day;

    let finalResult = new Date(formattedDate)
    return finalResult.getTime();

  }

  clearTxt() {
    this.isNoRecord = false;
    const getSearchData = this.searchForm.get('searchInp').value;

    if (getSearchData.length > 0 && this.detectSearchAPI) {
      // this.getEnterpriseList()
    }
    this.searchForm.patchValue({
      searchInp: ''
    })



  }

}
