import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverystatuslistComponent } from './deliverystatuslist.component';

describe('DeliverystatuslistComponent', () => {
  let component: DeliverystatuslistComponent;
  let fixture: ComponentFixture<DeliverystatuslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverystatuslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverystatuslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
