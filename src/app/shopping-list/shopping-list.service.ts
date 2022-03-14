import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

/**
 * Servizio per la gestione dell'area shopping
 */
@Injectable()
export class ShoppingListService {
  /**
   * Evento modifica ingredienti
   */
  ingredientsChanged: EventEmitter<Ingredient[]>;

  /**
   * Lista degli ingredienti
   */
  private ingredients: Ingredient[] = [];

  /**
   * Costruttore
   */
  constructor() {
    this.ingredientsChanged = new EventEmitter<Ingredient[]>();
  }

  /**
   * Ottieni gli ingredienti
   * @returns ingredienti
   */
  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  /**
   * Aggiunti un ingrediente
   * @param ingredient ingrediente
   */
  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients());
  }

  /**
   * Rimuovi un ingrediente
   * @param ingredient Ingrediente
   */
  public removeIngredient(ingredient: Ingredient): void {
    if (this?.ingredients.length) {
      const index = this.ingredients.findIndex((i) => i.name === ingredient.name);

      if (index > -1) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.emit(this.getIngredients());
      }
    }
  }

  /**
   * Aggiungi più ingredienti
   * @param ingredients Ingredienti
   */
  public addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.getIngredients());
  }
}
