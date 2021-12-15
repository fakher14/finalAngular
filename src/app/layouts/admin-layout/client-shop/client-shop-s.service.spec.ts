import { TestBed } from '@angular/core/testing';

import { ClientShopSService } from './client-shop-s.service';

describe('ClientShopSService', () => {
  let service: ClientShopSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientShopSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
