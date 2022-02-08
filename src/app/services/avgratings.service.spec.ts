import { TestBed } from '@angular/core/testing';

import { AvgratingsService } from './avgratings.service';

describe('AvgratingsService', () => {
  let service: AvgratingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvgratingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
