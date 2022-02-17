import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

/**
 * Item che rappresenta una ricetta
 */
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  /**
   * Ricetta visualizzata dal componente
   */
  @Input()
  recipe: Recipe;

  /**
   * Evento selezione ricetta
   */
  @Output()
  onRecipeSelected: EventEmitter<Recipe>;

  /**
   * Costruttore
   */
  constructor() {
    this.onRecipeSelected = new EventEmitter<Recipe>();
  }

  /**
   * Hook initi componente
   */
  ngOnInit(): void {}

  /**
   * Evento selezione ricetta
   */
  onSelect() {
    this.onRecipeSelected.emit(this.recipe);
  }
}
