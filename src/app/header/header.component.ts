import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

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
   * Costruttore
   * @param dataStorageService Servizio per le API di back-end firebase
   */
  constructor(private dataStorageService: DataStorageService) {}

  /**
   * Salva le ricette in firebase
   */
  onSave() {
    this.dataStorageService.saveRecipes().subscribe({
      next: (responseData) => {
        console.log(responseData);
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
}
