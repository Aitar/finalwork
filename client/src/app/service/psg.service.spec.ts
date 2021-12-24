import { TestBed } from '@angular/core/testing';

import { PsgService } from './psg.service';

describe('PsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PsgService = TestBed.get(PsgService);
    expect(service).toBeTruthy();
  });
});
