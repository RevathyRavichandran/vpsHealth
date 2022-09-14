import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLazyComponent } from './chart-lazy.component';

describe('ChartLazyComponent', () => {
  let component: ChartLazyComponent;
  let fixture: ComponentFixture<ChartLazyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartLazyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
