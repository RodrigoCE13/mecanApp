import { TestBed } from '@angular/core/testing';

import { TipoMantencionPrevService } from './tipo-mantencion-prev.service';

describe('TipoMantencionPrevService', () => {
  let service: TipoMantencionPrevService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMantencionPrevService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
