import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditIntervalComponent } from './add-edit-interval.component';

describe('AddEditIntervalComponent', () => {
  let component: AddEditIntervalComponent;
  let fixture: ComponentFixture<AddEditIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditIntervalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
