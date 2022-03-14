import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

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
  constructor(private shoppingListService: ShoppingListService) {}

  /**
   * Hook init componente
   */
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChanged.subscribe((ing) => (this.ingredients = ing));
  }
}
