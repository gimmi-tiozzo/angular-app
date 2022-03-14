import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

/**
 * Regole do routin per l'indirizzamento dei componenti
 */
const routeRules: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
];

/**
 * Modulo per la gestione delle regole di routing
 */
@NgModule({
  imports: [RouterModule.forRoot(routeRules)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
