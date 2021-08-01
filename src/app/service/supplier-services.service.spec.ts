import { TestBed } from '@angular/core/testing';

import { SupplierServicesService } from './supplier-services.service';

describe('SupplierServicesService', () => {
  let service: SupplierServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
