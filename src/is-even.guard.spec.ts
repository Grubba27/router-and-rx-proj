import { TestBed } from '@angular/core/testing';

import { IsEvenGuard } from './is-even.guard';

describe('IsEvenGuard', () => {
  let guard: IsEvenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsEvenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
