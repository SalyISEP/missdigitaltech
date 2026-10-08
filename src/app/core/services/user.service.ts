import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private api: ApiService) {}

  getMe(): Observable<User> {
    return this.api.get<User>('users/me/');
  }

  updateMe(data: Partial<User>): Observable<User> {
    return this.api.put<User>('users/me/', data);
  }

  getAll(): Observable<User[]> {
    return this.api.get<User[]>('users/');
  }

  getById(id: string): Observable<User> {
    return this.api.get<User>(`users/${id}/`);
  }
}
