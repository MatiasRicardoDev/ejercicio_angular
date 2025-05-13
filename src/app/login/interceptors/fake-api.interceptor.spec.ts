import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { FakeApiInterceptor } from './fake-api.interceptor';

describe('fakeApiInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => new FakeApiInterceptor().intercept(req, { handle: next }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });


  it('Debe Crear el Interceptor', () => {
    expect(interceptor).toBeTruthy();
  });

  it('Debe de interceptar la peticion', () => {
    const req = {
      url: 'http://localhost:4200/api/login',
      method: 'POST',
      body: { email: 'user@demo.com', password: '123456' },
    };

    const next = {
      handle: jasmine.createSpy('handle').and.callFake(() => {
        return {
          subscribe: (callback: Function) => callback({ status: 200, body: { token: 'fake-jwt-token' } }),
        };
      }),
    };

    const result = interceptor(req as any, next as any);

    result.subscribe(() => {
      expect(next.handle).toHaveBeenCalled();
    });
    result.subscribe((response: any) => {
      expect(response.status).toBe(200);
      expect(response.body.token).toBe('fake-jwt-token');
    });
  });
});
