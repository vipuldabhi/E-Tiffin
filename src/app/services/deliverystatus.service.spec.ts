import { TestBed } from '@angular/core/testing';

import { DeliverystatusService } from './deliverystatus.service';

describe('DeliverystatusService', () => {
  let service: DeliverystatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverystatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
