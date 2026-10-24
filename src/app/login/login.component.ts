
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  error = '';
  isLoading = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  submitLoginForm(loginForm: FormGroup) {
    if (loginForm.invalid) {
      loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.error = '';

    this._AuthService.signin(loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('userToken', response.id);
        this._AuthService.saveUserData();
        this.isLoading = false;
        this._Router.navigate(['/home']);
      },
      error: () => {
        this.isLoading = false;
        this.error = 'Invalid Email or Password';
      }
    });
  }
}
