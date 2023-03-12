import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen:boolean=false;
@HostListener('click') toggle(){
this.isOpen=!this.isOpen;
}
  constructor() { }

}
