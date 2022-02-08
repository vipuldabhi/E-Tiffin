import { TestBed } from '@angular/core/testing';

import { DeliverychargesService } from './deliverycharges.service';

describe('DeliverychargesService', () => {
  let service: DeliverychargesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverychargesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
