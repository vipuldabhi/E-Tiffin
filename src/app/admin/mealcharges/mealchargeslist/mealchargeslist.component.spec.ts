import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealchargeslistComponent } from './mealchargeslist.component';

describe('MealchargeslistComponent', () => {
  let component: MealchargeslistComponent;
  let fixture: ComponentFixture<MealchargeslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealchargeslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealchargeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
