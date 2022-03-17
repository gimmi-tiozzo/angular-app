import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
   * Costruttore
   * @param activatedRoute route attiva
   */
  constructor(private activatedRoute: ActivatedRoute) {}

  /**
   * Init componente
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      console.log(this.id);
    });

    this.activatedRoute.data.subscribe((data) => {
      this.editMode = data['editMode'];
      console.log(this.editMode);
    });
  }
}
