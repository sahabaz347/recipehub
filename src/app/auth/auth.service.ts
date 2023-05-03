import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './user/user.module';
export interface AuthResponseData {
  email: string;
  status: number;
  id: number;
  loginTime: number;
  token: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpireTime: any;
  constructor(private http: HttpClient, private router: Router) { }
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('http://localhost/soppycity/recipe_data.php?action=signup',
      {
        email: email,
        password: password
      }).pipe(tap(resData => this.handleAuthentication(+resData.status, +resData.id, +resData.loginTime, resData.email, resData.token)))
  }

  autoLogin() {
    const UserData: {
      status: number;
      id: number;
      _loginTime: number;
      expireTime: any;
      email: string;
      token: string
    } = JSON.parse(localStorage.getItem('UserData')!);
    if (!UserData) {
      return;
    }
    const loadUser = new User(UserData.status, UserData.id, UserData._loginTime, UserData.expireTime, UserData.email, UserData.token);
    if (loadUser.token) {
      this.user.next(loadUser);
      // const currentTime=new Date().getTime()-UserData._loginTime -UserData. expireTime
      this.autoLogout(loadUser.expireTime);
    }
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('http://localhost/soppycity/recipe_data.php?action=login',
      {
        email: email,
        password: password
      }).pipe(tap(resData => this.handleAuthentication(resData.status, resData.id, resData.loginTime, resData.email, resData.token)))
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    if(this.tokenExpireTime){
clearTimeout(this.tokenExpireTime);
    }
    this.tokenExpireTime=null;
    localStorage.setItem('UserData','');
  }
  private handleAuthentication(status: number, id: number, loginTime: number, email: any, token: any) {
    //  const expireTime:any=+loginTime+3600*24000;
    if (loginTime) {
      var expireTime: any=30000;
    } else {
      var expireTime: any = 0;
    }
    const user = new User(status, id, loginTime, expireTime, email, token);
    this.user.next(user);
    this.autoLogout(expireTime);
    localStorage.setItem('UserData', JSON.stringify(user));
  }
  autoLogout(expretionDuration: number) {
    this.tokenExpireTime = setTimeout(() => {
      this.logout();
    }, expretionDuration);
  }

}
