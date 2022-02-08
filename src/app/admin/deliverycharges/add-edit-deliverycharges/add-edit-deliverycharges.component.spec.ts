import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDeliverychargesComponent } from './add-edit-deliverycharges.component';

describe('AddEditDeliverychargesComponent', () => {
  let component: AddEditDeliverychargesComponent;
  let fixture: ComponentFixture<AddEditDeliverychargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDeliverychargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDeliverychargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
