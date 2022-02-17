import { Component, EventEmitter, Output } from '@angular/core';
import { SubViewType } from '../shared/subview-type.enum';

/**
 * Componente Heaader
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  /**
   * Evento che indica la sottovista da visualizzare
   */
  @Output()
  subViewEnabled: EventEmitter<SubViewType>;

  /**
   * Costruttore
   */
  constructor() {
    this.subViewEnabled = new EventEmitter<SubViewType>();
  }

  /**
   * Gestione evento per la visualizzazione del componente relativo alle ricette
   */
  onRecipiesView() {
    this.subViewEnabled.emit(SubViewType.Recipies);
  }

  /**
   * Gestione evento per la visualizzazione del componente relativo alla lista degli ingredienti da aquistare
   */
  onShoppingListView() {
    this.subViewEnabled.emit(SubViewType.ShoppingList);
  }

  /**
   * Nessuna vista
   */
  onRecipeBook() {
    this.subViewEnabled.emit(SubViewType.None);
  }
}
