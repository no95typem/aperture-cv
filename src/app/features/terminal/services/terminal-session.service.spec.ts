import { TestBed } from '@angular/core/testing';

import { TerminalSessionService } from './terminal-session.service';

describe('TerminalSessionService', () => {
  let service: TerminalSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
