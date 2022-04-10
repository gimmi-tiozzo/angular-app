import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Componente per la visualizzazione di un div modale di alert
 */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  /**
   * Messaggio da visualizzare nel div modale di alert
   */
  @Input()
  message: string;

  /**
   * Evento chiusura div modale
   */
  @Output()
  close: EventEmitter<void>;

  /**
   * Costruttore
   */
  constructor() {
    this.close = new EventEmitter<void>();
  }

  /**
   * Chiudi div modale
   */
  onClose() {
    this.close.emit();
  }
}
