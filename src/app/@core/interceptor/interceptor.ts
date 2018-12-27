import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {catchError, mergeMap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor(
    private storage: LocalStorage,
    private toastrService: NbToastrService,
    private auth: AuthService,
  ) { }

  // Intercepts all HTTP requests!
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const tokenObservable = this.storage.getItem<string>('token');

    return tokenObservable.pipe(
      mergeMap(token => {
        const clonedReq = this.addToken(request, token);
        return next.handle(clonedReq).pipe(
          catchError(err => {
            // Perhaps display an error for specific status codes here already?
            if (err.status === 400 && err.error.message === 'Failed to authenticate token.') {
              this.auth.logout();
            }

            if (err.status === 401 && err.error.error === 'TokenExpiredError') {
              this.auth.logout();
            }

            let errorText = '';
            if (err.error) {
              errorText = err.error.message;
            } else if (err.statusText) {
              errorText = err.statusText;
            }

            this.toastrService.show(
              'Something went wrong', errorText,
              { status: NbToastStatus.DANGER, duration: 3000 },
            );

            // Pass the error to the caller of the function
            return throwError(err);
          }),
        );
      }),
    );
  }

  // Adds the token to your headers if it exists
  private addToken(request: HttpRequest<any>, token: string) {
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          'Authorisation': `Bearer ${token}`,
        },
      });
      return clone;
    }

    return request;
  }
}
