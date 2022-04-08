import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

/**
 * Componente Heaader
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  /**
   * Indica se si è autenticati o meno
   */
  isAuthenticated: boolean;

  /**
   * Sottoscrizione a Subject login user
   */
  userSubscription: Subscription;

  /**
   * Costruttore
   * @param dataStorageService Servizio per le API di back-end firebase
   * @param authService Servizio di autenticazione
   */
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
    this.isAuthenticated = false;
  }

  /**
   * Hook init
   */
  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => (this.isAuthenticated = !!user));
  }

  /**
   * Hook destroy
   */
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  /**
   * Salva le ricette in firebase
   */
  onSave() {
    this.dataStorageService.saveRecipes().subscribe({
      next: (responseData) => {
        alert('Ricette Salvate correttamente');
      },
      error: (error) => {
        console.error(error);
        alert(`Errore nel salvataggio delle ricette: ${error.message}`);
      },
    });
  }

  /**
   * Recupera le ricette salvatein firebase
   */
  onFetch() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  /**
   * Esegui il logout
   */
  logout() {
    this.authService.logout();
  }
}
