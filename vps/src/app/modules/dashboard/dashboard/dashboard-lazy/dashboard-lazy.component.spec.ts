import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLazyComponent } from './dashboard-lazy.component';

describe('DashboardLazyComponent', () => {
  let component: DashboardLazyComponent;
  let fixture: ComponentFixture<DashboardLazyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardLazyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
