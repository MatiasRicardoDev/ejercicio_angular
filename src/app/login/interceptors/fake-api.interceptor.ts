import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


@Injectable()
export class FakeApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = req;

    return of(null).pipe(
      delay(500),
      mergeMap(() => {
        if (url.endsWith('/api/login') && method === 'POST') {
          const { email, password }: any = body;
          if (email === 'user@demo.com' && password === '123456') {
            return of(
              new HttpResponse({
                status: 200,
                body: {
                  id: 1,
                  username: 'Demo User',
                  token: 'fake-jwt-token',
                },
              })
            );
          } else {
            return throwError(
              () =>
                new HttpErrorResponse({
                  status: 401,
                  statusText: 'Unauthorized',
                  error: { message: 'Invalid Credentials' },
                })
            );
          }
        }
        return next.handle(req);
      }),
      materialize(),
      delay(500),
      dematerialize()
    );
  }
}
