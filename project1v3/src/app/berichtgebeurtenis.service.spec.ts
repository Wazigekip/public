import { TestBed } from '@angular/core/testing';

import { BerichtgebeurtenisService } from './berichtgebeurtenis.service';

describe('BerichtgebeurtenisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BerichtgebeurtenisService = TestBed.get(BerichtgebeurtenisService);
    expect(service).toBeTruthy();
  });
});
