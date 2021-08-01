import { TestBed } from '@angular/core/testing';

import { PersoServiceService } from './perso-service.service';

describe('PersoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersoServiceService = TestBed.get(PersoServiceService);
    expect(service).toBeTruthy();
  });
});
