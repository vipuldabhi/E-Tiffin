import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingslistComponent } from './ratingslist.component';

describe('RatingslistComponent', () => {
  let component: RatingslistComponent;
  let fixture: ComponentFixture<RatingslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
