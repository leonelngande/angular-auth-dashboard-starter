import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import {IUser} from '../models/user';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class LoggedInUserResolver implements Resolve<IUser> {

  constructor(private authService: AuthService) { }

  resolve(): Observable<IUser> | Observable<never> {
    return this.authService.getCurrentUser().pipe(
      catchError(err => {
        // this.notificationService.errorNotification();
        return EMPTY;
      }),
    );
  }
}
