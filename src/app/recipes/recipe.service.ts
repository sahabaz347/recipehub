import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged=new Subject<Recipe[]>();
  recipes:Recipe[]=[];
  // new Recipe('Tasty Schnitzel','A super-Tasty Schnitzel - just Awsome!','https://thumbs.dreamstime.com/b/gourmet-tasty-crumbled-schnitzel-crispy-fries-close-up-lemon-tomato-lettuce-50667370.jpg',[new Ingredient('Meat',1),new Ingredient('French Frice',20)]),new Recipe('Big Fat Barger','What else you need to say?','https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/mbtg1wsd3zdqu3v3rpgd',[new Ingredient('Buns',2),new Ingredient('Meat',1)])
  constructor(private shopingListService:ShoppingListService) {
    // console.log(this.recipes[1])
   }
   setRecipes(recipes:Recipe[]){
    this.recipes=recipes;
    this.recipeChanged.next(this.recipes.slice());
   }
  getRecipes(){
    return this.recipes.slice();
  }
  addIngredientToShoppingList(ingrdients:Ingredient[]){
this.shopingListService.addIngridents(ingrdients);
  }
  getRecipe(index:number){
return this.recipes[index];
  }
  addRecipe(recipe:Recipe){
this.recipes.push(recipe);
this.recipeChanged.next(this.recipes.slice())
  }
  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index]=newRecipe;
this.recipeChanged.next(this.recipes.slice())
  }
  deleteRecipe(index:number){
this.recipes.splice(index,1);
this.recipeChanged.next(this.recipes.slice());
  }
}
