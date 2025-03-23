import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { response } from 'express';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  error: string = '';
  isLoading: boolean = false;
  registerForm: FormGroup = new FormGroup({

    first_name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    last_name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    age: new FormControl(null, [Validators.min(16), Validators.max(60), Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.pattern(/^[A-Z]/), Validators.required]),

  }

  );
  submitRegisterForm(registerForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.signup(registerForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response) {
          this._Router.navigate(['/login'])
        }
      }, error: (err) => console.log('ERRoR', err),

    });
  }





}
