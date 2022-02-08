import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDeliverystatusComponent } from './add-edit-deliverystatus.component';

describe('AddEditDeliverystatusComponent', () => {
  let component: AddEditDeliverystatusComponent;
  let fixture: ComponentFixture<AddEditDeliverystatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDeliverystatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDeliverystatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
