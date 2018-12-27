import { Injectable } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {ApiService} from '../api/api.service';
import {Observable, throwError} from 'rxjs';
import {IUser} from '../models/user';

@Injectable()
export class UserService {

  data: IUser[] = [];

  constructor(private apiService: ApiService) {}

  static adaptUser(user: any): IUser {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      dob: user.dob,
      phone: user.phone,
      avatar: user.avatar,
      active: user.active,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
    };
  }

  fetchAll(): Observable<IUser[]> {
    return this.apiService.get('/users').pipe(
      map((users: any) => {
        return users.map(user => UserService.adaptUser(user));
      }),
      catchError(err => throwError(err)),
    );
  }

  fetch(id: number): Observable<IUser> {
    return this.apiService.get(`/users/${id}`).pipe(
      map((user: any) => UserService.adaptUser(user.data)),
      catchError(err => throwError(err)),
    );
  }

  create(payload: IUser) {
    return this.apiService.post('/users', payload);
  }

  update(id: number, payload: IUser) {
    return this.apiService.put(`/users/${id}`, payload);
  }

  delete(id: number) {
    return this.apiService.delete(`/users/${id}`);
  }
}
