import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOrderdetailsComponent } from './add-edit-orderdetails.component';

describe('AddEditOrderdetailsComponent', () => {
  let component: AddEditOrderdetailsComponent;
  let fixture: ComponentFixture<AddEditOrderdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditOrderdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditOrderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
