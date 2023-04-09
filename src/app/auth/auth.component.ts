import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLoginMood = true;
  isLoading = false;
  errorMsg!: number;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMood() {
    this.isLoginMood = !this.isLoginMood;
  }
  onSubmit(authForm: NgForm) {
    // console.log(authForm);
    if (authForm.invalid) {
      return;
    } else {
      const email = authForm.value.email;
      const password = authForm.value.password;
      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      if (this.isLoginMood) {
        authObs = this.authService.login(email, password);
      } else {
        authObs = this.authService.signUp(email, password);
      }
      authObs.subscribe(resData => {console.log(resData)
        this.errorMsg = +resData.status;
        this.isLoading = false;
        this.authService.user.subscribe(user => {
          if (user && user._loginTime) {
            this.router.navigate(['/recipes']);
          }
        })
      }, error => {
        console.log(error);
        this.isLoading = false;

      })

      authForm.reset();
    }
  }
}
