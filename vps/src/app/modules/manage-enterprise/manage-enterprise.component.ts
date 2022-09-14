import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-manage-enterprise',
  templateUrl: './manage-enterprise.component.html',
  styleUrls: ['./manage-enterprise.component.css']
})
export class ManageEnterpriseComponent implements OnInit, OnDestroy {

  isEnterprise: boolean;
  isTicket: boolean;
  isPayment: boolean;
  unSubscribe: Subscription;

  constructor(
    private location: Location,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.unSubscribe = this.utilityService.detectSideNavbar$.subscribe((data: string) => {
      if (data === '') {
        this.isEnterprise = this.location.path().includes('onboard') ? true : false;
        this.isTicket = this.location.path().includes('tickets') ? true : false;
        this.isPayment = this.location.path().includes('payment') ? true : false;
      } else {
        this.isEnterprise = data.includes('onboard') ? true : false;
        this.isTicket = data.includes('tickets') ? true : false;
        this.isPayment = data.includes('payment') ? true : false;
      }
    });
  }

  ngOnDestroy() {
    this.unSubscribe.unsubscribe();
  }

}
