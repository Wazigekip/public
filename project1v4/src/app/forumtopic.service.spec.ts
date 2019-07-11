import { TestBed } from '@angular/core/testing';

import { ForumtopicService } from './forumtopic.service';

describe('ForumtopicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForumtopicService = TestBed.get(ForumtopicService);
    expect(service).toBeTruthy();
  });
});
