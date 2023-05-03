import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth-guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RouterModule, Routes } from "@angular/router";
const routes:Routes=[
    {path:'recipes',component:RecipesComponent,canActivate:[AuthGuard],children:[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent},
        {path:':id/edit',component:RecipeEditComponent}
       ]},
]
@NgModule({
    declarations: [],
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports:[RouterModule]
})
export class RercipesRoutingModule{
   
}