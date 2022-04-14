import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

/**
 * Regole do routing per l'indirizzamento dei componenti
 */
const routeRules: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
  },
];

/**
 * Feature module per la gestine delle route relative alla sezione shopping list
 */
@NgModule({ imports: [RouterModule.forChild(routeRules)], exports: [RouterModule] })
export class ShoppingListRoutingModule {}
