import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  Reservation,
  ReservationService
} from '../../../core/services/reservation.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[] = [];
  loading = true;
  error = '';

  constructor(
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe({
      next: reservations => {
        this.reservations = reservations;
        this.loading = false;
      },
      error: error => {
        console.error('Erreur réservations:', error);
        this.error = 'Impossible de charger vos réservations.';
        this.loading = false;
      }
    });
  }
}
