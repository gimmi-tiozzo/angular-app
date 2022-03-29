import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

/**
 * Componente per l'editing degli ingredienti di una ricetta
 */
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  /**
   * Form
   */
  @ViewChild('f', { static: false })
  private editForm: NgForm;

  /**
   * Indica se siamo in modalità edit
   */
  public editMode: boolean;

  /**
   * Indice elemento da modificare
   */
  private editedIndexItem: number;

  /**
   * Ingrediente modificato
   */
  private editedItem: Ingredient;

  /**
   * Sottoscrizione evento modifica ingrediente
   */
  private subscription: Subscription;

  /**
   * Costruttore
   */
  constructor(private shoppingListService: ShoppingListService) {
    this.editMode = false;
  }

  /**
   * Hook init component
   */
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.editedIndexItem = index;
      this.editedItem = this.shoppingListService.getIngredientByIndex(index);

      this.editForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }

  /**
   * Hook distruzione componente
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Aggiunta/modifica ingrediente
   * @param form form
   */
  onUpsert(form: NgForm) {
    const name: string = form.value.name;
    const amount: number = +form.value.amount;
    const newIngredient = { name, amount };

    if (this.editMode) {
      this.shoppingListService.updateIngredientByIndex(this.editedIndexItem, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    form.reset();
    this.editMode = false;
  }

  /**
   * Eliminazione ingrediente
   * @param form form
   */
  onDelete(form: NgForm) {
    const name: string = form.value.name;
    const amount: number = +form.value.amount;

    this.shoppingListService.removeIngredient({ name, amount: amount });
    form.reset();
    this.editMode = false;
  }

  /**
   * Cancel campi di input
   * @param form form
   */
  onClear(form: NgForm) {
    form.reset();
    this.editMode = false;
  }
}
