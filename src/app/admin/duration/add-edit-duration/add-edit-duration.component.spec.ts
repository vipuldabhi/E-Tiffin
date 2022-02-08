import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDurationComponent } from './add-edit-duration.component';

describe('AddEditDurationComponent', () => {
  let component: AddEditDurationComponent;
  let fixture: ComponentFixture<AddEditDurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
