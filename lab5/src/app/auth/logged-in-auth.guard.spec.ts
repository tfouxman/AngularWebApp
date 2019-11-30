import { TestBed, async, inject } from '@angular/core/testing';

import { LoggedInAuthGuard } from './logged-in-auth.guard';

describe('LoggedInAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedInAuthGuard]
    });
  });

  it('should ...', inject([LoggedInAuthGuard], (guard: LoggedInAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
