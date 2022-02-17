import { Component } from '@angular/core';
import { SubViewType } from './shared/subview-type.enum';

/**
 * Root component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /**
   * Titolo componente
   */
  title = 'angular-app';

  /**
   * Tipo di sottovista scelta dal componente header
   */
  subViewType: SubViewType;

  /**
   * Enum scelta sottovista
   */
  SubViewTypeEnum = SubViewType;

  /**
   * Costruttore di default
   */
  constructor() {
    this.subViewType = SubViewType.Recipies;
  }
}
