import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private notifications: NotificationService,
    private route: ActivatedRoute
  ) {}

  submit(): void {
    this.error = '';

    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.error = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.password.length < 8) {
      this.error = 'Le mot de passe doit contenir au moins 8 caractères.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.loading = true;

    this.auth.register({
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      phone: this.phone,
      password: this.password
    }).subscribe({
      next: () => {
        this.loading = false;

        this.notifications.success(
          'Inscription réussie. Vous pouvez maintenant vous connecter.'
        );

        this.router.navigate(['/login'], { queryParams: { returnUrl: this.route.snapshot.queryParamMap.get('returnUrl') || '/espace-client/dashboard' } });
      },
      error: error => {
        this.loading = false;

        if (error?.status === 400) {
          if (error?.error?.email) {
            this.error = 'Cette adresse e-mail est déjà utilisée.';
          } else {
            this.error = 'Les informations saisies sont invalides.';
          }
        } else {
          this.error = 'Impossible de contacter le serveur.';
        }
      }
    });
  }
}
