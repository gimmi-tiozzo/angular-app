import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

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
  constructor(private shoppingListService: ShoppingListService) {}

  /**
   * Hook init component
   */
  ngOnInit(): void {}

  /**
   * Aggiunta ingrediente
   */
  onAdd() {
    this.shoppingListService.addIngredient({ name: this.nameInput.nativeElement.value, amount: +this.amountInput.nativeElement.value });
  }

  /**
   * Eliminazione ingrediente
   */
  onDelete() {
    this.shoppingListService.removeIngredient({ name: this.nameInput.nativeElement.value, amount: +this.amountInput.nativeElement.value });
  }

  /**
   * Cancel campi di input
   */
  onClear() {
    this.nameInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }
}
