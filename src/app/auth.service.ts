import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { json } from 'stream/consumers';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    /*if( localStorage.getItem('userToken') != null )
    {
      this.saveUserData();
    }*/
   }
  userData:any = new BehaviorSubject(null);

  saveUserData() {
    let encodedToken = JSON.stringify ( localStorage.getItem('userToken'));
    this.userData.next( encodedToken) ;
    console.log(this.userData);
  }

  signup(userData: object): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/users', userData)
  }

  signin(userData: object): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/signin', userData)
  }

  signout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login'])

  }


}
