import { TestBed } from '@angular/core/testing';

import { TipoUserService } from './tipo-user.service';

describe('TipoUserService', () => {
  let service: TipoUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
