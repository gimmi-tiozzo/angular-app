import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { Router } from '@angular/router';

/**
 * Item che rappresenta una ricetta
 */
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  /**
   * Ricetta visualizzata dal componente
   */
  @Input()
  recipe: Recipe;

  /**
   * Indice ricetta
   */
  @Input()
  index: number;

  /**
   * Costruttore
   * @param recipeService servizio per la gestione delle ricetta
   * @param router router
   */
  constructor(private recipeService: RecipeService, private router: Router) {}

  /**
   * Hook initi componente
   */
  ngOnInit(): void {}

  /**
   * Evento selezione ricetta
   */
  // onSelect() {
  //   this.router.navigate(['/recipes', this.recipe.id]);
  // }
}
