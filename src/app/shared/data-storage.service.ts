import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storedata() {
    // debugger;
    const recipes = this.recipeService.getRecipes();
    this.http.post('http://localhost/soppycity/recipe_data.php?action=store', recipes).subscribe(postData => {
      console.log(postData);
    })
  }
  getData() {
   return this.http.get<Recipe[]>('http://localhost/soppycity/recipe_data.php?action=fetch').pipe(map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      })
      }),tap(recipes=>{
        this.recipeService.setRecipes(recipes);
    }))
  }
}
