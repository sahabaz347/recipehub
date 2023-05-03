import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
 @Input() massage!: number;
 @Input() status!: boolean;
 @ Output() close=new EventEmitter<void>();
 constructor(private router:Router){}
 onClose(){
this.close.emit();
 }

 


}
