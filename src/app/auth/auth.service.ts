import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { AuthResponseData } from './auth-response-data.type';
import { User } from './user.model';

/**
 * Servizio per la gestione dell'autorizzazione
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Behavior Subject per notificare la presenza di un utente loggato
   */
  user: BehaviorSubject<User>;

  /**
   * Token timer autologout
   */
  private timerToken: any;

  /**
   * Costruttore
   * @param http servizio per l'accesso alle API Http
   * @param signUpApiRestEndpoint Endpoint per l'accesso alle API di autenticazione sign up
   * @param signInApiRestEndpoint Endpoint per l'accesso alle API di autenticazione sign in
   * @param router router di navigazione
   */
  constructor(
    private http: HttpClient,
    @Inject('SignUpApiRestEndpoint') private signUpApiRestEndpoint: string,
    @Inject('SignInApiRestEndpoint') private signInApiRestEndpoint: string,
    private router: Router
  ) {
    this.user = new BehaviorSubject<User>(null);
  }

  /**
   * Registra un nuovo user
   * @param email email utente
   * @param password password utente
   */
  public signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(this.signUpApiRestEndpoint, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((responseData) => this.handleAuthentication(responseData)),
        catchError(this.handleError)
      );
  }

  /**
   * Login user
   * @param email email utente
   * @param password password utente
   */
  public singIn(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(this.signInApiRestEndpoint, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((responseData) => this.handleAuthentication(responseData)),
        catchError(this.handleError)
      );
  }

  /**
   * Logout user correntemente autenticato
   */
  public logout() {
    this.user.next(null);
    localStorage.removeItem('userData');

    if (this.timerToken) {
      clearTimeout(this.timerToken);
      this.timerToken = null;
    }

    this.router.navigate(['/auth']);
  }

  /**
   * Esegui un login con il token recuperato da localstorage
   */
  public autoLogin() {
    const userData: { email: string; id: string; _token: string; _tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.autologout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
      this.user.next(loadedUser);
    }
  }

  /**
   * Esegui un logout temporizzato in base alla scadenza del token di autenticazione
   * @param expirationDuration durata in ms di una sessione di login
   */
  public autologout(expirationDuration: number) {
    this.timerToken = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  /**
   * Gestisci la risposta in caso di autenticazione o registrazione
   * @param responseData Body risposta
   */
  private handleAuthentication(responseData: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
    const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);

    localStorage.setItem('userData', JSON.stringify(user));
    this.autologout(+responseData.expiresIn * 1000);
    this.user.next(user);
  }

  /**
   * Transcodifica messaggidi errore
   * @param errorRes Risposta di errore
   * @returns Messaggio di errore
   */
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string;

    switch (errorRes?.error?.error?.message) {
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
      case 'USER_DISABLED':
        errorMessage = 'Login in not correct!';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      default:
        errorMessage = 'An error is occured!';
        break;
    }

    return throwError(() => new Error(errorMessage));
  }
}
