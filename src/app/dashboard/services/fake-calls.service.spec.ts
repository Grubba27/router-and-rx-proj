import { TestBed } from '@angular/core/testing';

import { FakeCallsService } from './fake-calls.service';

describe('FakeCallsService', () => {
  let service: FakeCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
