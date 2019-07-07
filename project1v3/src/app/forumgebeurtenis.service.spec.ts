import { TestBed } from '@angular/core/testing';

import { ForumgebeurtenisService } from './forumgebeurtenis.service';

describe('ForumgebeurtenisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForumgebeurtenisService = TestBed.get(ForumgebeurtenisService);
    expect(service).toBeTruthy();
  });
});
