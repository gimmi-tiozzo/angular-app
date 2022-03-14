import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

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
   * Costruttore
   */
  constructor(private recipeService: RecipeService) {}

  /**
   * Hook initi componente
   */
  ngOnInit(): void {}

  /**
   * Evento selezione ricetta
   */
  onSelect() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
