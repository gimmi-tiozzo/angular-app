import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  recipe: Recipe;

  /**
   * Costrtuttore
   * @param recipeService servizio per la gestione delle ricetta
   * @param route router
   * @param activedRoute route attiva
   */
  constructor(private recipeService: RecipeService, private route: Router, private activedRoute: ActivatedRoute) {}

  /**
   * Hook init componente
   */
  ngOnInit(): void {
    //this.recipe = this.recipeService.getRecipeById(+this.activedRoute.snapshot.params['id']);
    this.activedRoute.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipeById(+params['id']);
    });
  }

  toShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
    this.route.navigate(['/shopping-list']);
  }

  /**
   * Edit di una ricetta
   */
  public onEditRecipe() {
    this.route.navigate(['edit'], { relativeTo: this.activedRoute });
  }

  /**
   * Cancella una ricetta
   */
  public onDeleteRecipe() {
    this.recipeService.deleteRecipeByIndex(this.recipe.id);
    this.route.navigate(['/recipes']);
  }
}
