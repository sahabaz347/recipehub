import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListModule } from "./shopping-list.module";
const routes:Routes=[
  {path:'shopping-list',component:ShoppingListComponent},
]
@NgModule({
    declarations: [],
    imports: [
      // RouterModule.forRoot(routes)
    ],
    exports:[ShoppingListModule]
})
export class ShoppingListRoutingModule{
   
}