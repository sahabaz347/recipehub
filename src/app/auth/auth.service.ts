import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface AuthResponseData {
  email:string;
  password:string;
  status:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
   signUp(email:string,password:string){
    return this.http.post<AuthResponseData>('http://localhost/soppycity/recipe_data.php?action=signup',
    {
      email:email,
      password:password
     });
   }

   login(email:string,password:string){
    return this.http.post<AuthResponseData>('http://localhost/soppycity/recipe_data.php?action=login',
    {
      email:email,
      password:password
     });
   }

}
