import { TestBed } from '@angular/core/testing';

import { MealchargesService } from './mealcharges.service';

describe('MealchargesService', () => {
  let service: MealchargesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealchargesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
