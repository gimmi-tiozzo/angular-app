import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth-response-data.type';
import { AuthService } from './auth.service';

/**
 * Componente per la gestione del login
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  /**
   * Indica se siamo in modalità login o sign up
   */
  isLoginMode: boolean;

  /**
   * Indica se il form è in attesa di una richiesta http
   */
  isLoading: boolean;

  /**
   * Messaggio di errore
   */
  error: string;

  /**
   * Costruttore
   * @param authService Servizio di autenticazione
   * @param router router di navigazione
   */
  constructor(private authService: AuthService, private router: Router) {
    this.isLoginMode = true;
    this.isLoading = false;
    this.error = null;
  }

  /**
   * Hook init componente
   */
  ngOnInit(): void {}

  /**
   * Esegui lo switch tra login mode e sign up mode
   */
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  /**
   * Gestionesubmit form di autenticazione
   * @param form form
   */
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let authObservable: Observable<AuthResponseData>;
    const { email, password } = form.value;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this.authService.singIn(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
      this.authService.signUp(email, password);
    }

    authObservable.subscribe({
      next: (resData) => {
        this.isLoading = false;
        this.error = null;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      },
    });

    this.router.navigate(['/recipes']);
  }
}
