import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShoppingListRoutingModule } from "./shoppin-list-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
    ],
  imports: [ReactiveFormsModule,
        RouterModule,ShoppingListRoutingModule,SharedModule,FormsModule
    ]
})
export class ShoppingListModule { }