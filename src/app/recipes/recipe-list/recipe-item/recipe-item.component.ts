import { Component, Input, OnInit} from '@angular/core';
import { Event } from '@angular/router';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
constructor(){}
@Input() recipeDetails!:Recipe;
@Input() index!:number;
loading:boolean=true;
ngOnInit(): void {
  this.loading=!this.recipeDetails?true:false
}

}
