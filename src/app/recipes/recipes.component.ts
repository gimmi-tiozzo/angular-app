import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

/**
 * Componente root per le ricette
 */
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
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
}
