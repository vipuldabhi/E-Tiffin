import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantslistComponent } from './restaurantslist.component';

describe('RestaurantslistComponent', () => {
  let component: RestaurantslistComponent;
  let fixture: ComponentFixture<RestaurantslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
