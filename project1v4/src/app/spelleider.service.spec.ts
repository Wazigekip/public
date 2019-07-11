import { TestBed } from '@angular/core/testing';

import { SpelleiderService } from './spelleider.service';

describe('SpelleiderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpelleiderService = TestBed.get(SpelleiderService);
    expect(service).toBeTruthy();
  });
});
