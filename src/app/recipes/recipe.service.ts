import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { ActivatedRoute } from '@angular/router';

/**
 * Servizio per la gestione delle ricette
 */
@Injectable()
export class RecipeService {
  /**
   * Lista ricette
   */
  private recipes: Recipe[] = [
    new Recipe(
      0,
      'A Test Recipe',
      'This is a simply test',
      'https://www.thespruceeats.com/thmb/yK8psUDvXdEKOvzFtLtx-n4ETuQ=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegan-tofu-tikka-masala-recipe-3378484-hero-01-d676687a7b0a4640a55be669cba73095.jpg',
      [new Ingredient('Ingredient 1', 1), new Ingredient('Ingredient 2', 2)]
    ),
    new Recipe(
      1,
      'A Second Test Recipe',
      'This is a second simply test',
      'https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Dum-Aloo-e163632.jpg?webp=true&quality=90&resize=940%2C399',
      [new Ingredient('Ingredient 3', 3), new Ingredient('Ingredient 4', 4)]
    ),
  ];

  /**
   * Costruttore
   * @param shoppingListService servizio per la gestione della shopping list
   * @param route corrente
   */
  public constructor(private shoppingListService: ShoppingListService, private activatedRouter: ActivatedRoute) {}

  /**
   * Ottieni una shallow copy della lista delle ricette
   * @returns Shallow copy della lista delle ricette
   */
  public getRecipies(): Recipe[] {
    return this.recipes.slice();
  }

  /**
   * Trova una ricetta per id
   * @param id id ricetta
   * @returns ricetta trovata per id
   */
  public getRecipeById(id: number): Recipe {
    return this.recipes.find((r) => r.id === id);
  }

  /**
   * Aggiungi più ingrefienti
   * @param ingredients Ingredienti
   */
  public addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
