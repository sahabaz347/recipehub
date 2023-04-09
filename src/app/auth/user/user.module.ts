// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
export class User {
  constructor(
    public status:number,
    public id:number,
    public _loginTime:number,
    public expireTime:any,
    public email:string,
    public token:any,

  ){}
  get loginTime(){
   if(!this._loginTime || new Date().valueOf()>this.expireTime){
     return ;
   }else{
     this._loginTime;
   }
 }
 }
