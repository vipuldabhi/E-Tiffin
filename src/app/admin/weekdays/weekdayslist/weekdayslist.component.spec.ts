import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekdayslistComponent } from './weekdayslist.component';

describe('WeekdayslistComponent', () => {
  let component: WeekdayslistComponent;
  let fixture: ComponentFixture<WeekdayslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekdayslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekdayslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
