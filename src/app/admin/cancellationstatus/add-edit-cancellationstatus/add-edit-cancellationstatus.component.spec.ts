import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCancellationstatusComponent } from './add-edit-cancellationstatus.component';

describe('AddEditCancellationstatusComponent', () => {
  let component: AddEditCancellationstatusComponent;
  let fixture: ComponentFixture<AddEditCancellationstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCancellationstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCancellationstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
