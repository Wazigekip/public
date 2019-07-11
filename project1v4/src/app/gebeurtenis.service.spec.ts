import { TestBed } from '@angular/core/testing';

import { GebeurtenisService } from './gebeurtenis.service';

describe('GebeurtenisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GebeurtenisService = TestBed.get(GebeurtenisService);
    expect(service).toBeTruthy();
  });
});
