
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  error = '';
  isLoading = false;
  success = '';

  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.required
    ]),
    last_name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.required
    ]),
    age: new FormControl(null, [
      Validators.min(16),
      Validators.max(60),
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.pattern(/^[A-Z]/),
      Validators.required
    ])
  });

  submitRegisterForm(registerForm: FormGroup) {
    this.error = '';
    this.success = '';

    if (registerForm.invalid) {
      registerForm.markAllAsTouched();
      this.error = 'Please fill in all fields correctly.';
      return;
    }

    this.isLoading = true;

    this._AuthService.signup(registerForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;

        if (response) {
          this.success = 'Registration successful! Redirecting to login...';
          this._Router.navigate(['/login']);
        } else {
          this.error = 'Registration failed. Please try again.';
        }
      },
      error: (err) => {
        this.isLoading = false;

        if (err?.error?.message === 'Email already exists') {
          this.error = 'This email is already registered.';
        } else {
          this.error = 'Something went wrong. Please try again.';
        }
      }
    });
  }
}
