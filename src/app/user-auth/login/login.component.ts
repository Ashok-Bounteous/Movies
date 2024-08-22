// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserauthService } from '../../services/userauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userauthService: UserauthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginDetails = this.loginForm.value;

    this.userauthService.userLogin(loginDetails).subscribe({
      next: (data) => {
        this.userauthService.saveTokens(data.access_token, data.refresh_token);
        this.userauthService.storeUserEmail(this.loginForm.value.email);
        this.snackBar.open('Login successful', 'Close', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';
        this.snackBar.open('Login failed: Invalid email or password', 'Close', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' });
      }
    });
  }
}
