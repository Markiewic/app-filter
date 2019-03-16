import { TestBed } from '@angular/core/testing';

import { YTVideosService } from './ytvideos.service';

describe('YTVideosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YTVideosService = TestBed.get(YTVideosService);
    expect(service).toBeTruthy();
  });
});
