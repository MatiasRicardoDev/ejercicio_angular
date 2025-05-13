import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/login', { email, password }).pipe(
      tap(response => {
        if(response) {
          localStorage.setItem('user', JSON.stringify(response));
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout():void {
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

}
//if (email === 'user@demo.com' && password === '123456') {
