import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  recipes: Recipe[];

  /**
   * Costruttore
   * @param recipeService servizio ricette
   * @param route router
   */
  constructor(private recipeService: RecipeService, private route: Router, private activatedRoute: ActivatedRoute) {}

  /**
   * Hook init componente
   */
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipies();
  }

  /**
   * Indirizza al componente per creare una nuova ricetta
   */
  public onNewRecipe(): void {
    this.route.navigate(['new'], { relativeTo: this.activatedRoute });
    console.log('dd');
  }
}
