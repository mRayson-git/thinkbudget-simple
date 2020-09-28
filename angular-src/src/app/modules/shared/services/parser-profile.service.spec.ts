import { TestBed } from '@angular/core/testing';

import { ParserProfileService } from './parser-profile.service';

describe('ParserProfileService', () => {
  let service: ParserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
