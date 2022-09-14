import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, OnDestroy {

  constructor(
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    // this.utilityService.logOut();
  }

}
