import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEnterpriseComponent } from './manage-enterprise.component';

describe('ManageEnterpriseComponent', () => {
  let component: ManageEnterpriseComponent;
  let fixture: ComponentFixture<ManageEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEnterpriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
