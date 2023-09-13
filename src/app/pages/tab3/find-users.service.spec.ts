import { TestBed } from '@angular/core/testing';

import { FindUsersService } from './find-users.service';

describe('FindUsersService', () => {
  let service: FindUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
