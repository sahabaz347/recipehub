import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() getRecipe=new EventEmitter<string>();
  collapsed:boolean=true;
  isShow:boolean=false;
isShowValue!:string;
constructor(private dataStorageService:DataStorageService){}
checkIsOpen(){
  this.isShow=!this.isShow;
 this.isShowValue=(this.isShow==true)?'show':'hide';
}
// getValue!:string;

  onSelect(data:any){
this.getRecipe.emit(data);
// console.log(this.getRecipe)
  }
  savaData(){
this.dataStorageService.storedata();
  }

  fetchData(){
    this.dataStorageService.getData().subscribe();
  }
}
