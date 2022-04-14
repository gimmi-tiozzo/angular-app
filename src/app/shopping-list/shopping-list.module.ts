import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-rounting.module';
import { ShoppingListComponent } from './shopping-list.component';

/**
 * Feature module per la gestione della sezione shopping
 */
@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [FormsModule, ShoppingListRoutingModule, SharedModule],
  //non serve esportare i componenti se non sono utilizzatti esplicitamente a livello di template o routing in app module
  //exports: [ShoppingListComponent, ShoppingEditComponent],
})
export class ShoppingListModule {}
