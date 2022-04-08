import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

/**
 * Root component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  /**
   * Titolo componente
   */
  title = 'angular-app';

  /**
   * Costruttore di default
   * @param authService servizio di autenticazione
   */
  constructor(private authService: AuthService) {}

  /**
   * Hook inito componente
   */
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
