import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '@services/utility.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  isOpenAccordian: boolean;
  isEnterpriseClicked: boolean;
  isAdminClicked: boolean;
  selectedNavTab: string;
  selectedChildNavTab: string;

  constructor(
    private router: Router,
    private utilityService: UtilityService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.selectedNavTab = '1';
    this.selectedChildNavTab = '0';
    // this.tabSelection();
    this.pageChangeListener();

    window.addEventListener('load', (event) => {
      const location: string = this.location.path();
      if (location.includes('dashboard')) {
        this.selectedNavTab = '1';
        this.isEnterpriseClicked = true;
      } 
      else if (location.includes('appointment')) {
        this.selectedNavTab = '2';
        this.isEnterpriseClicked = true;
      }
     
      else if (location.includes('feedback')) {
        this.selectedNavTab = '3';
        this.isEnterpriseClicked = true;
      }
      else if (location.includes('tickets')) {
        this.selectedNavTab = '4';
        this.isEnterpriseClicked = true;
      }
      else if (location.includes('milestone')) {
        this.selectedNavTab = '5';
        this.isEnterpriseClicked = true;
      }
      else if(location.includes('visitors')){
        this.selectedNavTab = '6';
        this.isEnterpriseClicked = true;
      }
      else if (location.includes('region')) {
        this.selectedNavTab = '7';
        this.isEnterpriseClicked = true;
      }
    })
  }

  pageChangeListener() {
    this.location.onUrlChange((url) => {
      const location= url;
      if (location.includes('dashboard')) {
        this.selectedNavTab = '1';
        this.isEnterpriseClicked = true;
      } 
      else if(location.includes('appointment')){
        this.selectedNavTab = '2';
        this.isEnterpriseClicked = true;
      }
      else if (location.includes('feedback')) {
        this.selectedNavTab = '3';
        this.isEnterpriseClicked = true;
      }
      else if (location.includes('tickets')) {
        this.selectedNavTab = '4';
        this.isEnterpriseClicked = true;
      }
      else if (location.includes('milestone')) {
        this.selectedNavTab = '5';
        this.isEnterpriseClicked = true;
      }
      else if(location.includes('visitors')){
        this.selectedNavTab = '6';
        this.isEnterpriseClicked = true;
      }
      else if(location.includes('region')){
        this.selectedNavTab = '7';
        this.isEnterpriseClicked = true;
      }
    })
  }



  onDashboard() {
    this.router.navigateByUrl('pages/dashboard');
    this.selectedNavTab = '1';
    this.selectedChildNavTab = '0';
  }

  onAppointment(){
    this.router.navigateByUrl('pages/list/appointment');
    this.selectedNavTab = '2';
    this.selectedChildNavTab = '0';
  }

 
  onFeedback() {
    this.router.navigateByUrl('pages/list/feedback');
    this.selectedNavTab = '3';
    this.selectedChildNavTab = '0';
  }

  onTickets() {
    this.router.navigateByUrl('pages/list/tickets');
    this.selectedNavTab = '4';
    this.selectedChildNavTab = '0';
  }

  onMilestone() {
    this.router.navigateByUrl('pages/list/milestone');
    this.selectedNavTab = '5';
    this.selectedChildNavTab = '0';
  }

  onVisitors() {
    this.router.navigateByUrl('pages/list/visitors');
    this.selectedNavTab = '6';
    this.selectedChildNavTab = '0';
  } 

  onMatrix(){
    this.router.navigateByUrl('pages/list/metrix/region');
    this.selectedNavTab = '7';
    this.selectedChildNavTab = '0';
  }

 

  // tabSelection() {
  //   console.log('this.location', this.location.path());
  //   const location: string = this.location.path();
  //   if (location.includes('dashboard')) {
  //     this.selectedNavTab = '1';
  //   } else if (location.includes('enterprises')) {
  //     this.selectedNavTab = '2';
  //     if (location.includes('onboard')) {
  //       this.selectedChildNavTab = '2.1';
  //     } else if (location.includes('tickets')) {
  //       this.selectedChildNavTab = '2.2';
  //     } else if (location.includes('payment')) {
  //       this.selectedChildNavTab = '2.3';
  //     }
  //   } else if (location.includes('notification')) {
  //     this.selectedNavTab = '3';
  //   } else if (location.includes('profile')) {
  //     this.selectedNavTab = '4';
  //     if (location.includes('profile')) {
  //       this.selectedChildNavTab = '4.1';
  //     }
  //   }
  //   console.log('this.selectedNavTab', this.selectedNavTab);
  //   console.log('this.selectedChildNavTab', this.selectedChildNavTab);
  // }

  logOut() {
   
    this.utilityService.logOut();
  }

  goToDashboard() {
    this.router.navigateByUrl('pages/dashboard');
    this.selectedNavTab = '1';
    this.selectedChildNavTab = '0';
  }

}
