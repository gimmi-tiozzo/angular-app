import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Interceptor per iniettare in ogni richiesta http il token di autenticazione
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Costruttore
   * @param authService servizio di autenticazione
   */
  constructor(private authService: AuthService) {}
  /**
   * Intercetta richiesta http
   * @param req richiesta
   * @param next prossimo middleware
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });
        return next.handle(modifiedReq);
      })
    );
  }
}
