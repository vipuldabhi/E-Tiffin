import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWeekdaysComponent } from './add-edit-weekdays.component';

describe('AddEditWeekdaysComponent', () => {
  let component: AddEditWeekdaysComponent;
  let fixture: ComponentFixture<AddEditWeekdaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditWeekdaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWeekdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
