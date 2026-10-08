import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCredentials, RegisterData, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'mdt_current_user';
  private readonly usersKey = 'mdt_users';

  readonly currentUser = signal<User | null>(this.loadSession());
  readonly isAuthenticated = signal<boolean>(this.loadSession() !== null);

  constructor(private router: Router) {}

  login(credentials: AuthCredentials): boolean {
    const users = this.getUsers();

    const user = users.find(
      u =>
        u.email.toLowerCase() === credentials.email.toLowerCase() &&
        u.password === credentials.password
    );

    if (!user) {
      return false;
    }

    const sessionUser: User = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phone: user.phone
    };

    this.saveSession(sessionUser);
    return true;
  }

  register(data: RegisterData): { success: boolean; message: string } {
    const users = this.getUsers();

    const exists = users.some(
      u => u.email.toLowerCase() === data.email.toLowerCase()
    );

    if (exists) {
      return {
        success: false,
        message: 'Cette adresse e-mail est déjà utilisée.'
      };
    }

    const newUser = {
      id: crypto.randomUUID(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
      role: 'client' as const,
      phone: data.phone?.trim()
    };

    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));

    const { password, ...sessionUser } = newUser;
    this.saveSession(sessionUser);

    return {
      success: true,
      message: 'Compte créé avec succès.'
    };
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  getUser(): User | null {
    return this.currentUser();
  }

  requestPasswordReset(email: string): boolean {
    const users = this.getUsers();

    return users.some(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
    );
  }

  private saveSession(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  private loadSession(): User | null {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }

  private getUsers(): Array<User & { password: string }> {
    try {
      const stored = localStorage.getItem(this.usersKey);

      if (stored) {
        return JSON.parse(stored);
      }

      const admin = {
        id: 'admin-001',
        firstName: 'Saly',
        lastName: 'Dieng',
        email: 'admin@missdigital.tech',
        password: 'Admin123!',
        role: 'admin' as const
      };

      localStorage.setItem(this.usersKey, JSON.stringify([admin]));
      return [admin];
    } catch {
      return [];
    }
  }
}
