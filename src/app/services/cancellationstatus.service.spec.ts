import { TestBed } from '@angular/core/testing';

import { CancellationstatusService } from './cancellationstatus.service';

describe('CancellationstatusService', () => {
  let service: CancellationstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancellationstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
