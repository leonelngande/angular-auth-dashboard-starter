﻿import { Injectable } from '@angular/core';
import {catchError, mergeMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ApiService} from '../api/api.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import {NbAuthService} from '@nebular/auth';
import {IUser} from '../models/user';

@Injectable()
export class AuthService {

  private userUrl = '/me';

  constructor(public api: ApiService,
              private storage: LocalStorage,
              private nbAuth: NbAuthService) {}

  getPersistedUser(): Observable<IUser> {
    return this.storage.getItem('currentUser');
  }

  getCurrentUser(): Observable<IUser> {

    return this.getPersistedUser().pipe(
      mergeMap(currentUser => {
        if (currentUser && currentUser.id) {
          return this.getPersistedUser(); // return an observable
        } else {
          return this.fetchUser().pipe(
            tap(user => {
              // console.log('User Model: ', newUser);
              this.storage.setItemSubscribe('currentUser', user);
            }),
          );
        }
      }),
    );
  }

  checkTokenValidity() {
    return this.api.get('/activetoken');
  }

  private clearStorage() {
    this.nbAuth.logout('email').pipe(
      tap(_ => this.storage.clearSubscribe()),
    )
      .subscribe();
  }

  private fetchUser(): Observable<any> {
    return this.api.get(`${this.userUrl}`);
  }

  logout() {
    return this.nbAuth.isAuthenticated().pipe(
      mergeMap(isLoggedIn => this.api.post('/logout', {})
        .pipe(
          tap(_ => this.clearStorage()),
          catchError(err => {
            this.clearStorage();
            return err;
          }),
        ),
      ),
      catchError(err => {
        this.clearStorage();
        return err;
      }),
    );
  }
}
