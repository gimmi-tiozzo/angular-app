import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

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
   */
  constructor(private recipeService: RecipeService) {}

  /**
   * Hook init componente
   */
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipies();
  }
}
