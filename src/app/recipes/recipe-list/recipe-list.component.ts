import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

/**
 * Conponente Lista ricette
 */
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  /**
   * Lista ricette
   */
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is a simply test',
      'https://www.thespruceeats.com/thmb/yK8psUDvXdEKOvzFtLtx-n4ETuQ=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegan-tofu-tikka-masala-recipe-3378484-hero-01-d676687a7b0a4640a55be669cba73095.jpg'
    ),
    new Recipe(
      'A Second Test Recipe',
      'This is a second simply test',
      'https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Dum-Aloo-e163632.jpg?webp=true&quality=90&resize=940%2C399'
    ),
  ];

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
   * Hook init componente
   */
  ngOnInit(): void {}

  /**
   * Evento selezione ricetta
   * @param recipe Ricetta
   */
  onSelect(recipe: Recipe) {
    this.onRecipeSelected.emit(recipe);
  }
}
