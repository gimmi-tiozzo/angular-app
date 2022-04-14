import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
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
export class AuthComponent implements OnInit, OnDestroy {
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
   * Sottoscrizione evento close div errore
   */
  alertSubscription: Subscription;

  /**
   * Primo elemento DOM che usa la direttiva PlaceholderDirective
   */
  @ViewChild(PlaceholderDirective)
  alertHost: PlaceholderDirective;

  /**
   * Costruttore
   * @param authService Servizio di autenticazione
   * @param router router di navigazione
   * @param componentFactoryResolver Factory per la creazione di componenti
   */
  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
    this.isLoginMode = true;
    this.isLoading = false;
    this.error = null;
  }

  /**
   * Hook init componente
   */
  ngOnInit(): void {}

  /**
   * Hook destroy componente
   */
  ngOnDestroy(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }

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
      next: (_resData) => {
        this.isLoading = false;
        this.error = null;

        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        this.error = error.message;
        this.showErrorAlert(error.message);
        this.isLoading = false;
      },
    });
  }

  /**
   * Gestisci erroe di login/signup
   */
  onHandleError() {
    this.error = null;
  }

  /**
   * Visualizza un div modale di errore
   * @param errorMessage Messaggio di errore
   */
  showErrorAlert(errorMessage: string): void {
    const viewContainerRef = this.alertHost.viewContainerRef;
    viewContainerRef.clear();

    //questa è la vecchia versione che usa le  factory:
    // const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    // viewContainerRef.createComponent(alertCmpFactory);

    const alertCmp = viewContainerRef.createComponent(AlertComponent);
    alertCmp.instance.message = errorMessage;
    this.alertSubscription = alertCmp.instance.close.subscribe(() => {
      this.alertSubscription.unsubscribe();
      this.alertSubscription = null;
      viewContainerRef.clear();
    });
  }
}
