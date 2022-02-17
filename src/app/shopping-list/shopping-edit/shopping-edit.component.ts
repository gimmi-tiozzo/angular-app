import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

/**
 * Componente per l'editing degli ingredienti di una ricetta
 */
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  /**
   * Evento aggiunta ingrediente
   */
  @Output()
  onIngredientAdded: EventEmitter<Ingredient>;

  /**
   * Evento eliminazione ingrediente
   */
  @Output()
  onIngredientDeleted: EventEmitter<Ingredient>;

  /**
   * Input nome ingrediente
   */
  @ViewChild('nameInput')
  nameInput: ElementRef<HTMLInputElement>;

  /**
   * Input quantità ingredienti ricetta
   */
  @ViewChild('amountInput')
  amountInput: ElementRef<HTMLInputElement>;

  /**
   * Costruttore
   */
  constructor() {
    this.onIngredientAdded = new EventEmitter<Ingredient>();
    this.onIngredientDeleted = new EventEmitter<Ingredient>();
  }

  /**
   * Hook init component
   */
  ngOnInit(): void {}

  /**
   * Aggiunta ingrediente
   */
  onAdd() {
    this.onIngredientAdded.emit({ name: this.nameInput.nativeElement.value, amount: +this.amountInput.nativeElement.value });
  }

  /**
   * Eliminazione ingrediente
   */
  onDelete() {
    this.onIngredientDeleted.emit({ name: this.nameInput.nativeElement.value, amount: +this.amountInput.nativeElement.value });
  }

  /**
   * Cancel campi di input
   */
  onClear() {
    this.nameInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }
}
