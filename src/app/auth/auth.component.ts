import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  
isLoginMood=true;
isLoading=false;
errorMsg:string='';

constructor(private authService:AuthService) { }

onSwitchMood(){
  this.isLoginMood=!this.isLoginMood;
}
onSubmit(authForm:NgForm){
  // console.log(authForm);
  if(authForm.invalid){
    return;
  }else{
  const email=authForm.value.email;
  const password=authForm.value.password;
let authObs:Observable<AuthResponseData>;

  this.isLoading=true;
  if(this.isLoginMood){
    authObs=this.authService.login(email,password);
  }else{
    authObs=this.authService.signUp(email,password);
  }
  authObs.subscribe(resData=>{
    this.errorMsg=resData.status;
  
    this.isLoading=false;
  },error=>{
    console.log(error);
    this.isLoading=false;

  })
 
  authForm.reset();
  }
}
}
