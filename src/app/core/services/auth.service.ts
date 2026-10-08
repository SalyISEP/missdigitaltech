import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

interface JwtResponse {
  access: string;
  refresh: string;
}

interface ApiUser {
  id: number | string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  role?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api = environment.apiUrl;
  private readonly accessKey = 'mdt_access_token';
  private readonly refreshKey = 'mdt_refresh_token';
  private readonly userKey = 'mdt_user';

  private currentUser: User | null = this.loadUser();

  constructor(private http: HttpClient) {}

  login(credentials: {
    email: string;
    password: string;
  }): Observable<User> {
    return this.http
      .post<JwtResponse>(`${this.api}/auth/login/`, credentials)
      .pipe(
        tap(tokens => {
          localStorage.setItem(this.accessKey, tokens.access);
          localStorage.setItem(this.refreshKey, tokens.refresh);
        }),
        switchMap(() => this.loadCurrentUser())
      );
  }

  register(data: RegisterData): Observable<any> {
    const payload = {
      email: data.email,
      password: data.password,
      first_name: data.first_name || data.firstName || '',
      last_name: data.last_name || data.lastName || '',
      phone: data.phone || ''
    };

    return this.http.post(`${this.api}/auth/register/`, payload);
  }

  loadCurrentUser(): Observable<User> {
    return this.http
      .get<ApiUser>(`${this.api}/users/me/`)
      .pipe(
        map(user => this.mapUser(user)),
        tap(user => {
          this.currentUser = user;
          localStorage.setItem(this.userKey, JSON.stringify(user));
        })
      );
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getUser(): User | null {
    return this.currentUser;
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.api}/auth/password-reset/`, { email });
  }

  getToken(): string | null {
    return localStorage.getItem(this.accessKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  logout(): void {
    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);
    localStorage.removeItem(this.userKey);
    this.currentUser = null;
  }

  private mapUser(user: ApiUser): User {
    return {
      id: String(user.id),
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      email: user.email,
      phone: user.phone || '',
      role: user.role === 'admin' ? 'admin' : 'client'
    };
  }

  private loadUser(): User | null {
    const stored = localStorage.getItem(this.userKey);

    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored) as User;
    } catch {
      localStorage.removeItem(this.userKey);
      return null;
    }
  }
}
