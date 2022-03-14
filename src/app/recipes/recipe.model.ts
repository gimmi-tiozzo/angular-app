import { Ingredient } from '../shared/ingredient.model';

/**
 * Ricetta
 */
export class Recipe {
  /**
   * Nome ricetta
   */
  public name: string;
  /**
   * Descrizione ricetta
   */
  public description: string;
  /**
   * url immagine
   */
  public imagePath: string;
  /**
   * Ingredienti ricetta
   */
  public ingredients: Ingredient[];

  /**
   * Costruttore di default
   * @param name Nome ricetta
   * @param desc Descrizione ricetta
   * @param imagePath url immagine
   * @param ingredients Ingredienti ricetta
   */
  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
