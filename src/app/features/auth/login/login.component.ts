import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private notifications: NotificationService
  ) {}

  submit(): void {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Veuillez remplir tous les champs.';
      return;
    }

    this.loading = true;

    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: user => {
        this.loading = false;

        this.notifications.success('Connexion réussie.');

        if (user.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/espace-client/dashboard']);
        }
      },
      error: error => {
        this.loading = false;

        if (error?.status === 401) {
          this.error = 'E-mail ou mot de passe incorrect.';
        } else {
          this.error = 'Impossible de contacter le serveur.';
        }
      }
    });
  }
}
