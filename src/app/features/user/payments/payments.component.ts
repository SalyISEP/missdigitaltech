import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment, PaymentService } from '../../../core/services/payment.service';

@Component({
  selector: 'app-user-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  loading = true;
  error = '';

  constructor(private service: PaymentService) {}

  ngOnInit(): void {
    this.service.getPayments().subscribe({
      next: data => {
        this.payments = data;
        this.loading = false;
      },
      error: err => {
        console.error('Erreur paiements :', err);
        this.error = err?.error?.detail ||
          'Impossible de charger les paiements. Vérifiez votre connexion.';
        this.loading = false;
      }
    });
  }
}
