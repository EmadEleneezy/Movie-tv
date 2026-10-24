
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

interface DemoUser {
  id: string;
  first_name: string;
  last_name: string;
  age?: number;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly usersKey = 'movieTvDemoUsers';

  userData = new BehaviorSubject<string | null>(
    localStorage.getItem('userToken')
  );

  constructor(private _Router: Router) {}

  private getDemoUsers(): DemoUser[] {
    const savedUsers = localStorage.getItem(this.usersKey);

    const defaultUsers: DemoUser[] = [
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

    if (!savedUsers) {
      localStorage.setItem(this.usersKey, JSON.stringify(defaultUsers));
      return defaultUsers;
    }

    try {
      return JSON.parse(savedUsers) as DemoUser[];
    } catch {
      localStorage.setItem(this.usersKey, JSON.stringify(defaultUsers));
      return defaultUsers;
    }
  }

  private saveDemoUsers(users: DemoUser[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  saveUserData(): void {
    this.userData.next(localStorage.getItem('userToken'));
  }

  signup(userData: Omit<DemoUser, 'id'>): Observable<DemoUser> {
    const users = this.getDemoUsers();

    const email = userData.email.trim().toLowerCase();

    const exists = users.some(
      user => user.email.toLowerCase() === email
    );

    if (exists) {
      return throwError(
        () => ({ error: { message: 'Email already exists' } })
      );
    }

    const newUser: DemoUser = {
      ...userData,
      email,
      id: String(Date.now())
    };

    users.push(newUser);
    this.saveDemoUsers(users);

    return of(newUser);
  }

  signin(userData: { email: string; password: string }): Observable<DemoUser> {
    const users = this.getDemoUsers();

    const user = users.find(
      item =>
        item.email.toLowerCase() === userData.email.trim().toLowerCase() &&
        item.password === userData.password
    );

    if (!user) {
      return throwError(
        () => ({ error: { message: 'Invalid Email or Password' } })
      );
    }

    return of(user);
  }

  signout(): void {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}
