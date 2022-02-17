import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

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
  @Input()
  recipe: Recipe;

  /**
   * Costrtuttore
   */
  constructor() {}

  /**
   * Hook init componente
   */
  ngOnInit(): void {}
}
