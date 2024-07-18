// import { Component, Inject } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Login } from '../../interface/userauth';
// import { localStorageToken } from '../../javascriptapis/localstorage.token';
// import { Router } from '@angular/router';
// import { UserauthService } from '../../services/userauth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {

//   loginDetails = new FormGroup({
//     email: new FormControl("", Validators.required),
//     password: new FormControl("", Validators.required)
//   })

//   constructor(
//       private userAuth: UserauthService,
//       @Inject(localStorageToken) private localStorageToken: Storage,
//       private route: Router
//     ){}

//   onSubmit(){
//     const userDetails: Login = {
//       email: this.loginDetails.value.email?.toString() ?? "",
//       password: this.loginDetails.value.password?.toString() ?? ""
//     }

//     this.userAuth.userLogin(userDetails).subscribe({
//       next: data => {
//         this.localStorageToken.setItem("access_token", data.access_token);
//         this.localStorageToken.setItem("refresh_token", data.refresh_token);
//         this.route.navigate([""]);
//       },
//       error: () => alert("wrong password")
//     });
//   }
// }
// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from '../../services/userauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userauthService: UserauthService, private router: Router) {}

  onSubmit(): void {
    const loginDetails = { email: this.email, password: this.password };

    this.userauthService.userLogin(loginDetails)
      .subscribe({
        next: (data) => {
          console.log("in login : ",data)
          this.userauthService.saveTokens(data.access_token, data.refresh_token);
        
          this.userauthService.storeUserEmail(this.email); // Store email in localStorage

          

          this.router.navigate(['/']);
        },
        error: (error) => this.errorMessage = error.error
      });
  }
}
