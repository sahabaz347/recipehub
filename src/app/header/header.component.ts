import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() getRecipe = new EventEmitter<string>();
  isAuthencated:boolean=false;
  private userSub!:Subscription;
  collapsed: boolean = true;
  isShow: boolean = false;
  isShowValue!: string;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }
  ngOnInit(): void {

this.userSub=this.authService.user.subscribe(user=>{

    this.isAuthencated=!!user!;
    console.log(this.isAuthencated);
    setTimeout(() => {
      this.fetchData();
    }, 100);
});

  }
  
  checkIsOpen() {
    this.isShow = !this.isShow;
    this.isShowValue = (this.isShow == true) ? 'show' : 'hide';
  }
  // getValue!:string;

  onSelect(data: any) {
    this.getRecipe.emit(data);
    // console.log(this.getRecipe)
  }
  savaData() {
    this.dataStorageService.storedata();
  }

  fetchData() {
    this.dataStorageService.getData()?.subscribe();
  }
  logout(){
    this.authService.logout();
    console.log(123);
  }
  ngOnDestroy(): void {
this.userSub.unsubscribe();
  }
}
