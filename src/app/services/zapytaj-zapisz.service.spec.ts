import { TestBed } from '@angular/core/testing';

import { ZapytajZapiszService } from './zapytaj-zapisz.service';

describe('ZapytajZapiszService', () => {
  let service: ZapytajZapiszService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZapytajZapiszService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
