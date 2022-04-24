import { TestBed } from '@angular/core/testing';

import { SystemWindowDbusService } from './system-window-dbus.service';

describe('SystemWindowDbusService', () => {
  let service: SystemWindowDbusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemWindowDbusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
