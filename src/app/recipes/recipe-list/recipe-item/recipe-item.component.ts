import { Component, Input} from '@angular/core';
import { Event } from '@angular/router';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
constructor(){}
@Input() recipeDetails!:Recipe;
@Input() index!:number;

}
