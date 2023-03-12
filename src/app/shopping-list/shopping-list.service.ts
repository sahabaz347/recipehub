import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  addIngredients(ingrdients: Ingredient[]) {
    throw new Error('Method not implemented.');
  }
  ingredientsChanged = new Subject<Ingredient[]>();
  editIngredient = new Subject<number>();

  ingredients: Ingredient[] = [
    // new Ingredient('Apple', 2),
    // new Ingredient('Tomato', 5)
  ];
  constructor() { }
  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    // console.log(this.ingredients[index])
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngridents(ingredients: Ingredient[]) {
    // for(let ingredient of ingredients ){
    //   this.addIngredient(ingredient)
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index:number,newIngredient:Ingredient){
    this.ingredients[index]=newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice())

  }
}
