import { Component } from '@angular/core';

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
   * Costruttore di default
   */
  constructor() {}
}
