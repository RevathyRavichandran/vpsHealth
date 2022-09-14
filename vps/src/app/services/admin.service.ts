import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminProfileData: any = {}

  constructor() { }

  setProfileData(data) {
    this.adminProfileData = data;
  }

  getProfileData() {
    return this.adminProfileData;
  }
}
