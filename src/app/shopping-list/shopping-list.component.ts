import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

/**
 * Componente per la lista degli ingredienti
 */
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  /**
   * Lista degli ingredienti
   */
  ingredients: Ingredient[] = [];

  /**
   * Costruttore
   */
  constructor() {}

  /**
   * Hook init componente
   */
  ngOnInit(): void {}

  /**
   * Evento rimozione ingrediente
   */
  onDeleted(ingredient: Ingredient) {
    if (this.ingredients) {
      this.ingredients = this.ingredients.filter((i) => i.name !== ingredient.name);
    }
  }
}
