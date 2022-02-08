import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationlistComponent } from './durationlist.component';

describe('DurationlistComponent', () => {
  let component: DurationlistComponent;
  let fixture: ComponentFixture<DurationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DurationlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
