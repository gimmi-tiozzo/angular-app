/**
 * Dati di di risposta dall'API di signup
 */
export interface AuthResponseData {
  /**
   * A Firebase Auth ID token for the newly created user.
   */
  idToken: string;

  /**
   * The email for the newly created user.
   */
  email: string;

  /**
   * A Firebase Auth refresh token for the newly created user.
   */
  refreshToken: string;

  /**
   * The number of seconds in which the ID token expires.
   */
  expiresIn: string;

  /**
   * The uid of the newly created user.
   */
  localId: string;

  /**
   * Whether the email is for an existing account.
   */
  registered?: boolean;
}
