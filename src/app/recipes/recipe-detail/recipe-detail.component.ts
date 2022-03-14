import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

/**
 * Dettaglio ricetta
 */
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  /**
   * Ricetta
   */
  @Input()
  recipe: Recipe;

  /**
   * Costrtuttore
   */
  constructor(private recipeService: RecipeService) {}

  /**
   * Hook init componente
   */
  ngOnInit(): void {}

  toShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }
}
