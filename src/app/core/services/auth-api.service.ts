import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

interface LoginResponse {
  access: string;
  refresh: string;
  user?: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private api: ApiService) {}

  login(
    email: string,
    password: string
  ): Observable<LoginResponse> {
    return this.api
      .post<LoginResponse>('auth/login/', {
        email,
        password
      })
      .pipe(
        tap(response => {
          localStorage.setItem(
            'mdt_access_token',
            response.access
          );

          localStorage.setItem(
            'mdt_refresh_token',
            response.refresh
          );
        })
      );
  }

  register(data: unknown): Observable<unknown> {
    return this.api.post(
      'auth/register/',
      data
    );
  }

  refresh(): Observable<{ access: string }> {
    const refresh =
      localStorage.getItem('mdt_refresh_token');

    return this.api
      .post<{ access: string }>(
        'auth/token/refresh/',
        { refresh }
      )
      .pipe(
        tap(response => {
          localStorage.setItem(
            'mdt_access_token',
            response.access
          );
        })
      );
  }

  logout(): void {
    localStorage.removeItem(
      'mdt_access_token'
    );

    localStorage.removeItem(
      'mdt_refresh_token'
    );
  }
}
