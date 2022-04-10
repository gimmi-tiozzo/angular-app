import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Direttiva placehoder per l'inject di componenti dinamici
 */
@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  /**
   * Costruttore
   * @param viewContainerRef container in cui eseguire inject del componente dinamico
   */
  constructor(public viewContainerRef: ViewContainerRef) {}
}
