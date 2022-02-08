import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMealchargesComponent } from './add-edit-mealcharges.component';

describe('AddEditMealchargesComponent', () => {
  let component: AddEditMealchargesComponent;
  let fixture: ComponentFixture<AddEditMealchargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMealchargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMealchargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
