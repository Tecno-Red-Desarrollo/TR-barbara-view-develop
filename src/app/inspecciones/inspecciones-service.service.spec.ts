import { TestBed } from '@angular/core/testing';

import { InspeccionesServiceService } from './inspecciones-service.service';

describe('InspeccionesServiceService', () => {
  let service: InspeccionesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspeccionesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
