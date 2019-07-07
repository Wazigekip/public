import { TestBed } from '@angular/core/testing';

import { NamenlijstkrachtService } from './namenlijstkracht.service';

describe('NamenlijstkrachtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NamenlijstkrachtService = TestBed.get(NamenlijstkrachtService);
    expect(service).toBeTruthy();
  });
});
