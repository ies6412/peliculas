import { TestBed } from '@angular/core/testing';

import { SerivicioPeliculasService } from './serivicio-peliculas.service';

describe('SerivicioPeliculasService', () => {
  let service: SerivicioPeliculasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerivicioPeliculasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
