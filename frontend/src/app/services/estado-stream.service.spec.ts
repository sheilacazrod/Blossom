import { TestBed } from '@angular/core/testing';

import { EstadoStreamService } from './estado-stream.service';

describe('EstadoStreamService', () => {
  let service: EstadoStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
