import { TestBed } from '@angular/core/testing';

import { GetPlayerUrlService } from './get-player-url.service';

describe('GetPlayerUrlService', () => {
  let service: GetPlayerUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPlayerUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
