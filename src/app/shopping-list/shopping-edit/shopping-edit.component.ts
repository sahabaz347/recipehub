import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') editForm!: NgForm
  subctiption!: Subscription;
  editMood = false;
  editIndexVal!: number;
  editItem!: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }
  ngOnInit(): void {
    this.subctiption = this.shoppingListService.editIngredient.subscribe(
      (index: number) => {
        this.editMood = true;
        this.editIndexVal = index;
        this.editItem = this.shoppingListService.getIngredient(index)
        // console.log(this.editItem);
        this.editForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
        // console.log(this.editForm);
      }
    )
  }
  saveDetails(form: NgForm) {
    const data = form.value;
    const ingName = data.name;
    const ingAmount = data.amount
    const newIngredients = new Ingredient(ingName, ingAmount);
    if(this.editMood){
      this.shoppingListService.updateIngredient(this.editIndexVal,newIngredients)
      this.editMood=false;
    }else{
    this.shoppingListService.addIngredient(newIngredients);
    }
    form.reset();
  }
  onClear(){
    this.editForm.reset();
    this.editMood=false;
  }
  onDelete(){
    this.onClear();
   this.shoppingListService.deleteIngredient(this.editIndexVal);
  }

  ngOnDestroy(): void {
    this.subctiption.unsubscribe();
  }

}
