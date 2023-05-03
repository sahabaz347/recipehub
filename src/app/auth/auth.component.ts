import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {

  isLoginMood = true;
  isLoading = false;
  errorMsg!: number;
  private closeSub!: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }
  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

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
      authObs.subscribe(resData => {
        console.log(resData)
        this.errorMsg = +resData.status;
        this.isLoading = false;
        this.showErrorAlert(this.errorMsg, this.isLoginMood);
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
  onHandleError() {
    this.errorMsg = 0;
  }
  private showErrorAlert(massage: number, status: boolean) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContaionerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.massage = massage;
    componentRef.instance.status = status;
    // alert(componentRef.instance.massage)
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });

  }
  ngOnDestroy() {
    this.closeSub.unsubscribe();

  }
}
