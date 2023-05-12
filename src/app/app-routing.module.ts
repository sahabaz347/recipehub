import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes:Routes=[
  {path:'',redirectTo:'/recipes',pathMatch:'full'},
  {path:'shopping-list',component:ShoppingListComponent},
  {path:'auth',component:AuthComponent},
  {path:'recipes',loadChildren:()=>import('./recipes/recipes.module').then(m=>m.RecipesModule)}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
