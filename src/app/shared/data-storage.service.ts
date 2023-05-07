import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, exhaustMap, map, take, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService implements OnDestroy {
  userInfo:Subscription | undefined;
  recipes!:Recipe[];
  getUserData:any;
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storedata() {

        this.recipes = this.recipeService.getRecipes();
        const localInfo=JSON.parse(localStorage.getItem('UserData')!);
        this.recipes=this.recipes;
        console.log(this.recipes);

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'id':localInfo.id,
        'email':localInfo.email
      })
    };
    this.http.post('http://localhost/soppycity/recipe_data.php?action=store', this.recipes,httpOptions).subscribe(postData => {
      // console.log(postData);
    })
  }
  getData() {
      const localInfo=JSON.parse(localStorage.getItem('UserData')!);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'id':localInfo.id,
          'email':localInfo.email
        })
      };
      return this.http.get<Recipe[]>('http://localhost/soppycity/recipe_data.php?action=fetch',httpOptions)
    .pipe(map(recipes => {
      console.log(recipes)
      return recipes.map(recipe => {
        if(typeof recipe.ingredients === 'string'){
          recipe.ingredients=JSON.parse( recipe.ingredients);
        }
        return {
          ...recipe ,ingredients: recipe.ingredients ?recipe.ingredients: []
        };
      })
    }), tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }))
  }
    // getData() {
  //   const localInfo = JSON.parse(localStorage.getItem('UserData')!);
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'id': localInfo.id,
  //       'email': localInfo.email
  //     })
  //   };
  //   return this.http.get<Recipe[]>('http://localhost/soppycity/recipe_data.php?action=fetch', httpOptions)
  //     .pipe(
  //       map(recipes => {
  //         return recipes.map(recipe => {
  //           let ingredients = [];
  //           if (typeof recipe.ingredients === 'string') {
  //             console.log(123);
  //             ingredients = JSON.parse(recipe.ingredients);
  //           } else {
  //             console.log(222);
  //             ingredients = recipe.ingredients;
  //           }
  //           return {
  //             ...recipe,
  //             ingredients: ingredients
  //           };
  //         });
  //       }), 
  //       tap(recipes => {
  //         this.recipeService.setRecipes(recipes);
  //       })
  //     );
  // }
  ngOnDestroy(){
    this.userInfo?.unsubscribe();
  }
}
