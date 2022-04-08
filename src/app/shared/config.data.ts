/**
 * Dati di configurazione
 */
export class ConfigData {
  /**
   * Endpoint per le API Rest di accesso al DB
   */
  public static ApiRestEndpoint: string = 'https://XXXX/recipes.json';

  /**
   * Endpoint per le API Rest di autenticazione di sign up
   */
  public static SignUpApiRestEndpoint: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=XXXX';

  /**
   * Endpoint per le API Rest di autenticazione di sign in
   */
  public static SignInApiRestEndpoint: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=XXXX';
}
