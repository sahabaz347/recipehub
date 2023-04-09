import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  constructor( private authService:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      const modifiedRequest=req.clone({
        params:new HttpParams().set('auth',user?.token)
      })
      return next.handle(modifiedRequest);
    }));
  }

}
