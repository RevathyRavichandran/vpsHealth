import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseProvisioningComponent } from './enterprise-provisioning.component';

describe('EnterpriseProvisioningComponent', () => {
  let component: EnterpriseProvisioningComponent;
  let fixture: ComponentFixture<EnterpriseProvisioningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseProvisioningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseProvisioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
