import { Component } from '@angular/core';

/**
 * Componente per gestione spinner
 */
@Component({
  selector: 'app-loading-spinner',
  template: "<div class='lds-ripple'><div></div><div></div></div>",
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent {}
