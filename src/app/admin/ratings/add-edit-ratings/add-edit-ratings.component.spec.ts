import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRatingsComponent } from './add-edit-ratings.component';

describe('AddEditRatingsComponent', () => {
  let component: AddEditRatingsComponent;
  let fixture: ComponentFixture<AddEditRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRatingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
