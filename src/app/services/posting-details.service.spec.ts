import { TestBed } from '@angular/core/testing';

import { PostingDetailsService } from './posting-details.service';

describe('PostingDetailsService', () => {
  let service: PostingDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostingDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
