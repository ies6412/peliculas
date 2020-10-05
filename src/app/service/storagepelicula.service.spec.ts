import { TestBed } from '@angular/core/testing';

import { StoragepeliculaService } from './storagepelicula.service';

describe('StoragepeliculaService', () => {
  let service: StoragepeliculaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoragepeliculaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
