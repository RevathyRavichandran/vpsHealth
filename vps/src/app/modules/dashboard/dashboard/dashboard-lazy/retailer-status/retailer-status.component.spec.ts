import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerStatusComponent } from './retailer-status.component';

describe('RetailerStatusComponent', () => {
  let component: RetailerStatusComponent;
  let fixture: ComponentFixture<RetailerStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
