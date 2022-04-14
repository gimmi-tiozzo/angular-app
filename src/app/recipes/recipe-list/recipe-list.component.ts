import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

/**
 * Conponente Lista ricette
 */
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  /**
   * Lista ricette
   */
  recipes: Recipe[];

  /**
   * Sottoscrizione evento cambio ricetta
   */
  subscription: Subscription;

  /**
   * Costruttore
   * @param recipeService servizio ricette
   * @param route router
   * @param activatedRoute route attiva
   * @param dataStorageService servizio accesso API Firebase di gestione CRUD delle ricette
   */
  constructor(private recipeService: RecipeService, private route: Router, private activatedRoute: ActivatedRoute, private dataStorageService: DataStorageService) {}

  /**
   * Hook init componente
   */
  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe((recipes) => (this.recipes = recipes));
    this.dataStorageService.fetchRecipes().subscribe();
    this.recipes = this.recipeService.getRecipies();
  }

  /**
   * Hook destroy componente
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Indirizza al componente per creare una nuova ricetta
   */
  public onNewRecipe(): void {
    this.route.navigate(['new'], { relativeTo: this.activatedRoute });
    console.log('dd');
  }
}
