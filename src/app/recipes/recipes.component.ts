import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

/**
 * Componente root per le ricette
 */
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  /**
   * Ricetta selezionata
   */
  recipeSelected: Recipe;

  /**
   * Costruttore
   */
  constructor() {}

  /**
   * Hook init componente
   */
  ngOnInit(): void {}

  /**
   * Evento selezione ricetta
   * @param recipe Ricetta
   */
  onSelect(recipe: Recipe) {
    this.recipeSelected = recipe;
  }
}
