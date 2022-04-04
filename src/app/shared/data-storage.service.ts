import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

/**
 * Servizio per il salvataggio e recupero dei dati delle ricette da Firebase
 */
@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  /**
   * Costruttore
   * @param http servizio client http
   * @param recipeService servizio per la gestione delle ricette
   */
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  /**
   * Salva le ricette
   * @returns Observable della put http per salvare le ricette
   */
  saveRecipes(): Observable<Recipe[]> {
    const recipes = this.recipeService.getRecipies();
    return this.http.put<Recipe[]>('https://xxx/recipes.json', recipes);
  }

  /**
   * Salva le ricette in firebase
   */
  fetchRecipes() {
    return this.http.get<Recipe[]>('https://xxx/recipes.json').pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((responseData) => {
        this.recipeService.setRecipes(responseData);
      })
    );
  }
}
