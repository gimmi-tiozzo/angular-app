import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

/**
 * Componente per la modifica o creazione di una ricetta
 */
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  /**
   * Id ricetta
   */
  private id: number;

  /**
   * Indica se siamo in edit mode
   */
  private editMode: boolean;

  /**
   * Form per la modifica di una ricetta
   */
  public recipeForm: FormGroup;

  /**
   * Costruttore
   * @param activatedRoute route attiva
   * @param recipeService servizio per la gestione delle ricette
   * @param router router di navigazione
   */
  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute, private router: Router) {}

  /**
   * Init componente
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.onInitForm();
    });

    this.activatedRoute.data.subscribe((data) => {
      this.editMode = data['editMode'];
    });
  }

  /**
   * Inizializzazione form
   */
  onInitForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  /**
   * Ottieni i controlli degli ingredienti
   */
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  /**
   * Submit form
   */
  onSubmit() {
    const recipe: Recipe = {
      id: 0,
      name: this.recipeForm.value.name,
      description: this.recipeForm.value.description,
      imagePath: this.recipeForm.value.imagePath,
      ingredients: this.recipeForm.value.ingredients,
    };

    if (this.editMode) {
      this.recipeService.updateRecipeByIndex(recipe.id, recipe);
    } else {
      recipe.id = this.recipeService.getRecipies().length;
      this.recipeService.addRecipe(recipe);
    }

    this.onCancel();
  }

  /**
   * Aggiungi un ingrediente
   */
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }

  /**
   * Cancellazione
   */
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  /**
   * Rimuovi un ingrediente
   * @param index indice ingrediente
   */
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
