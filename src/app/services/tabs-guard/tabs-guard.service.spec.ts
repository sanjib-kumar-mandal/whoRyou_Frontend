import { TestBed } from '@angular/core/testing';

import { TabsGuardService } from './tabs-guard.service';

describe('TabsGuardService', () => {
  let service: TabsGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabsGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
