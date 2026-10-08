import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ReservationService, Reservation } from '../../../core/services/reservation.service';
import { PaymentService, Payment } from '../../../core/services/payment.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {
  reservations: Reservation[] = [];
  payments: Payment[] = [];

  constructor(
    public auth: AuthService,
    private reservationService: ReservationService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe({
      next: data => this.reservations = data
    });
    this.paymentService.getPayments().subscribe({
      next: data => this.payments = data
    });
  }
}
