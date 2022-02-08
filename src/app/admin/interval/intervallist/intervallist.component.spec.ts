import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervallistComponent } from './intervallist.component';

describe('IntervallistComponent', () => {
  let component: IntervallistComponent;
  let fixture: ComponentFixture<IntervallistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervallistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
