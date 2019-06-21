import { TestBed } from '@angular/core/testing';

import { SpelspelerService } from './spelspeler.service';

describe('SpelspelerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpelspelerService = TestBed.get(SpelspelerService);
    expect(service).toBeTruthy();
  });
});
