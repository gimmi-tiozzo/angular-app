import { environment } from 'src/environments/environment';

/**
 * Dati di configurazione
 */
export class ConfigData {
  /**
   * Endpoint per le API Rest di accesso al DB
   */
  public static ApiRestEndpoint: string = `${environment.apiUrl}/recipes.json`;

  /**
   * Endpoint per le API Rest di autenticazione di sign up
   */
  public static SignUpApiRestEndpoint: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`;

  /**
   * Endpoint per le API Rest di autenticazione di sign in
   */
  public static SignInApiRestEndpoint: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;
}
