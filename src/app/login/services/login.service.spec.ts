import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('Debe Crearse el Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debe realizar el login correctamente', () => {
    const mockUser = {
      username: 'user@demo.com',
      password: '123456'
    };

    const result = service.login(mockUser.username, mockUser.password);
    expect(result).toBeTruthy();
  });

  it('Debe realizar el logout correctamente', () => {
    const result = service.logout();
    expect(result).toBeTruthy();
  });

});
