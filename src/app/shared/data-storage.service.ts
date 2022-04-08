import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

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
   * @param authService servizio di autenticazione
   */
  constructor(private http: HttpClient, private recipeService: RecipeService, @Inject('ApiRestEndpoint') private apiRestEndpoint: string, private authService: AuthService) {}

  /**
   * Salva le ricette
   * @returns Observable della put http per salvare le ricette
   */
  saveRecipes(): Observable<Recipe[]> {
    const recipes = this.recipeService.getRecipies();
    return this.http.put<Recipe[]>(this.apiRestEndpoint, recipes);
  }

  /**
   * Salva le ricette in firebase
   */
  fetchRecipes() {
    return this.http.get<Recipe[]>(this.apiRestEndpoint).pipe(
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
