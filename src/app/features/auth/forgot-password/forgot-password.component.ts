import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email = '';
  message = '';
  error = '';

  constructor(
    private auth: AuthService,
    private notifications: NotificationService
  ) {}

  submit(): void {
    this.message = '';
    this.error = '';

    if (!this.email) {
      this.error = 'Veuillez saisir votre adresse e-mail.';
      return;
    }

    const exists = this.auth.requestPasswordReset(this.email);

    if (!exists) {
      this.error = 'Aucun compte ne correspond à cette adresse e-mail.';
      return;
    }

    this.message =
      'Votre demande a été prise en compte. La réinitialisation sera disponible avec le backend.';
    this.notifications.success('Demande de réinitialisation enregistrée.');
  }
}
