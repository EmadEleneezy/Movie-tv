
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject<any>(
    localStorage.getItem('userToken')
  );

  constructor(private _Router: Router) {}

  private demoUsers = [
    {
      id: '1',
      first_name: 'Emad',
      last_name: 'Hossam',
      email: 'emadeneezy@gmail.com',
      password: 'Nice'
    },
    {
      id: '2',
      first_name: 'Bella',
      last_name: 'Nice',
      email: 'bellanice@gmail.com',
      password: 'Bella'
    }
  ];

  saveUserData() {
    this.userData.next(localStorage.getItem('userToken'));
  }

  signup(userData: any): Observable<any> {
    const exists = this.demoUsers.some(
      user => user.email.toLowerCase() === userData.email?.toLowerCase()
    );

    if (exists) {
      return throwError(() => ({ error: { message: 'Email already exists' } }));
    }

    const newUser = {
      ...userData,
      id: String(Date.now())
    };

    this.demoUsers.push(newUser);
    return of(newUser);
  }

  signin(userData: any): Observable<any> {
    const user = this.demoUsers.find(
      item =>
        item.email.toLowerCase() === userData.email?.toLowerCase() &&
        item.password === userData.password
    );

    if (!user) {
      return throwError(() => ({ error: { message: 'Invalid Email or Password' } }));
    }

    return of(user);
  }

  signout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}
