import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDeliveryboyComponent } from './add-edit-deliveryboy.component';

describe('AddEditDeliveryboyComponent', () => {
  let component: AddEditDeliveryboyComponent;
  let fixture: ComponentFixture<AddEditDeliveryboyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDeliveryboyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDeliveryboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
