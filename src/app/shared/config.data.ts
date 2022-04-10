/**
 * Dati di configurazione
 */
export class ConfigData {
  /**
   * Chiave accesso API Firebase
   */
  private static Apikey = 'xx';

  /**
   * Endpoint per le API Rest di accesso al DB
   */
  public static ApiRestEndpoint: string = 'https://xx/recipes.json';

  /**
   * Endpoint per le API Rest di autenticazione di sign up
   */
  public static SignUpApiRestEndpoint: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ConfigData.Apikey}`;

  /**
   * Endpoint per le API Rest di autenticazione di sign in
   */
  public static SignInApiRestEndpoint: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ConfigData.Apikey}`;
}
