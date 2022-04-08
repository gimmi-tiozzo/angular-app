/**
 * Utente loggato
 */
export class User {
  /**
   * Costruttore
   * @param email email utente
   * @param id id utente
   * @param _token_string token autenticazione
   * @param _tokenExpirationDate scadenza token
   */
  constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {}

  /**
   * Ottieni il token di autenticazione. Null se scaduto
   */
  get token() {
    return !this._tokenExpirationDate || new Date() > this._tokenExpirationDate ? null : this._token;
  }
}
