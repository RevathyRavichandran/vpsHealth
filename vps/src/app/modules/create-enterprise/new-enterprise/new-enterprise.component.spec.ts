import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEnterpriseComponent } from './new-enterprise.component';

describe('NewEnterpriseComponent', () => {
  let component: NewEnterpriseComponent;
  let fixture: ComponentFixture<NewEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEnterpriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
