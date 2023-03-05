import { TestBed } from '@angular/core/testing';

import { TrackedTeamsService } from './tracked-teams.service';

describe('TrackedTeamsService', () => {
  let service: TrackedTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackedTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
