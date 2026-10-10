import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  form = { name: '', email: '', subject: '', message: '' };
  submitting = false;
  success = '';
  error = '';

  constructor(private api: ApiService) {}

  envoyer(): void {
    if (this.submitting) return;
    this.success = '';
    this.error = '';
    this.submitting = true;

    this.api.post<{ id: number; name: string }>('contact/', {
      name: this.form.name.trim(),
      email: this.form.email.trim(),
      subject: this.form.subject.trim(),
      message: this.form.message.trim()
    }).subscribe({
      next: () => {
        this.success = 'Votre demande a bien été enregistrée. Merci pour votre message !';
        this.form = { name: '', email: '', subject: '', message: '' };
        this.submitting = false;
      },
      error: (err) => {
        const detail = err?.error;
        this.error = detail?.name?.[0]
          || detail?.email?.[0]
          || detail?.subject?.[0]
          || detail?.message?.[0]
          || detail?.detail
          || 'Impossible d’envoyer votre demande pour le moment. Réessayez plus tard.';
        this.submitting = false;
      }
    });
  }
}
