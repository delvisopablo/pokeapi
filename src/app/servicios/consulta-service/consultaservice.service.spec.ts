/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsultaserviceService } from './consultaservice.service';

describe('Service: Consultaservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultaserviceService]
    });
  });

  it('should ...', inject([ConsultaserviceService], (service: ConsultaserviceService) => {
    expect(service).toBeTruthy();
  }));
});
