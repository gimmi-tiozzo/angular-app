import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

/**
 * Servizio per la gestione dell'area shopping
 */
@Injectable()
export class ShoppingListService {
  /**
   * Evento modifica ingredienti (in alternativa ad EventEmitter<>)
   */
  ingredientsChanged: Subject<Ingredient[]>;

  /**
   * Evento editing ingrediente con indicazione dell'indice dell'ingrediente nella lista ingredienti
   */
  startedEditing: Subject<number>;

  /**
   * Lista degli ingredienti
   */
  private ingredients: Ingredient[] = [];

  /**
   * Costruttore
   */
  constructor() {
    this.ingredientsChanged = new Subject<Ingredient[]>();
    this.startedEditing = new Subject<number>();
  }

  /**
   * Ottieni gli ingredienti
   * @returns ingredienti
   */
  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  /**
   * Ottien un ingrediente alla posizione index
   * @param index indice ingrediente in array ingredienti
   * @returns Ingrediente alla posizione index
   */
  public getIngredientByIndex(index: number): Ingredient {
    return this.ingredients[index];
  }

  /**
   * Aggiorna ingrediente
   * @param index indice ingrediente
   * @param newIngredient Nuovo ingrediente
   */
  public updateIngredientByIndex(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.getIngredients());
  }

  /**
   * Aggiunti un ingrediente
   * @param ingredient ingrediente
   */
  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
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
        this.ingredientsChanged.next(this.getIngredients());
      }
    }
  }

  /**
   * Aggiungi più ingredienti
   * @param ingredients Ingredienti
   */
  public addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients());
  }
}
