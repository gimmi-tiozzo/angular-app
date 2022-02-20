import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

/**
 * Direttiva per aggiungere il menu a tendina per la gestione delle ricette
 */
@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  /**
   * Indica se la classe Open è stata applicata all'elemento puntato dalla direttiva
   */
  private isOpenApplies: boolean;

  /**
   * costruttore
   * @param elementRef Riferimento all'elemento a cui la direttiva è applicata
   * @param renderer Renderer
   */
  constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {
    this.isOpenApplies = false;
  }

  /**
   * Gestione click su bottone ManageRecipe
   * @param event parametri evento
   */
  @HostListener('click')
  clickManageRecipe(event: Event) {
    if (!this.isOpenApplies) {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    }

    this.isOpenApplies = !this.isOpenApplies;
  }
}
