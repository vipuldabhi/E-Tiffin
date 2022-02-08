import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFoodTypeComponent } from './add-edit-food-type.component';

describe('AddEditFoodTypeComponent', () => {
  let component: AddEditFoodTypeComponent;
  let fixture: ComponentFixture<AddEditFoodTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFoodTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFoodTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
