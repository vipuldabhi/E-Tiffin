import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdeliveryboyComponent } from './editdeliveryboy.component';

describe('EditdeliveryboyComponent', () => {
  let component: EditdeliveryboyComponent;
  let fixture: ComponentFixture<EditdeliveryboyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdeliveryboyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdeliveryboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
