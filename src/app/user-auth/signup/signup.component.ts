// src/app/components/signup/signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserauthService } from '../../services/userauth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userauthService: UserauthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatcher });
  }

  passwordMatcher(formGroup: FormGroup): any {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      return null;
    }
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const signupDetails = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      name: 'Sample',
      role: 'admin',
      avatar: 'https://th.bing.com/th?id=OIP.ywHdSgiEyb--OBN2gD2w1QHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'
    };

    this.userauthService.userSignup(signupDetails)
      .subscribe({
        next: () => {
          this.snackBar.open('Signup successful, redirecting to login...', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (error) => {
          this.snackBar.open('Signup failed', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      });
  }
}
