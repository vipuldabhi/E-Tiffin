import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverychargeslistComponent } from './deliverychargeslist.component';

describe('DeliverychargeslistComponent', () => {
  let component: DeliverychargeslistComponent;
  let fixture: ComponentFixture<DeliverychargeslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverychargeslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverychargeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
