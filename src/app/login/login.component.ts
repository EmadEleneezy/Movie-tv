import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { response } from 'express';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  error: string = '';
  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.pattern(/^[A-Z]/), Validators.required]),

  }

  );
  submitLoginForm(loginForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.signin(loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response) {
          console.log(response);
         localStorage.setItem('userToken',response.id);
         this._AuthService.saveUserData();
          this._Router.navigate(['/home'])
        }
        else {
          this.error = 'Invalid Email or Password';
        }

      }

    })
  }
}