import { TestBed } from '@angular/core/testing';

import { EnkeldoelwitkrachtService } from './enkeldoelwitkracht.service';

describe('EnkeldoelwitkrachtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnkeldoelwitkrachtService = TestBed.get(EnkeldoelwitkrachtService);
    expect(service).toBeTruthy();
  });
});
