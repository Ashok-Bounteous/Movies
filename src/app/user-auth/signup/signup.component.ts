// import { Component, Inject } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Signup } from '../../interface/userauth';
// import { localStorageToken } from '../../javascriptapis/localstorage.token';
// import { Router } from '@angular/router';
// import { UserauthService } from '../../services/userauth.service';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.scss']
// })
// export class SignupComponent {
//   signupDetails: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder,
//     private userAuth: UserauthService,
//     @Inject(localStorageToken) private localStorageToken: Storage,
//     private router: Router
//   ) {
//     this.signupDetails = this.formBuilder.group({
//       email: ['', Validators.required],
//       password: ['', Validators.required],
//       confirmPassword: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.signupDetails.value.password !== this.signupDetails.value.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     const userDetails: Signup = {
//       email: this.signupDetails.value.email,
//       name: "string",
//       password: this.signupDetails.value.password,
//       role: "admin",
//       avatar: "https://th.bing.com/th?id=OIP.ywHdSgiEyb--OBN2gD2w1QHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
//     };

//     this.userAuth.userSignup(userDetails).subscribe({
//       next: data => {
//         this.localStorageToken.setItem('access_token', data.access_token);
//         this.localStorageToken.setItem('refresh_token', data.refresh_token);
//         this.router.navigate(['']);
//       },
//       error: () => alert('Signup failed')
//     });
//   }
// }
// src/app/components/signup/signup.component.ts
// src/app/components/signup/signup.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from '../../services/userauth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userauthService: UserauthService, private router: Router) {}

  onSubmit(): void {
    const signupDetails = { email: this.email, password: this.password,
      name: "Sample",
      role: "admin",
      avatar: "https://th.bing.com/th?id=OIP.ywHdSgiEyb--OBN2gD2w1QHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
     };

    this.userauthService.userSignup(signupDetails)
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (error) => this.errorMessage = error.error
      });
  }
}
