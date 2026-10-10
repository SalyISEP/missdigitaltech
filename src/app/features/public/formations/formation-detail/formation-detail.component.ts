import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Formation, FormationService } from '../../../../core/services/formation.service';
import { ReservationService } from '../../../../core/services/reservation.service';
import { PaymentService } from '../../../../core/services/payment.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-formation-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './formation-detail.component.html',
  styleUrl: './formation-detail.component.scss'
})
export class FormationDetailComponent implements OnInit {
  formation: Formation | null = null;
  loading = true;
  error = '';
  success = '';
  date = '';
  time = '';
  notes = '';
  submitting = false;

  reservationId: number | null = null;
  paymentMethod: 'wave' | 'orange_money' = 'wave';
  paymentSubmitting = false;
  paymentMessage = '';
  paymentError = '';

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService,
    private reservationService: ReservationService,
    private paymentService: PaymentService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Formation introuvable.';
      this.loading = false;
      return;
    }

    this.formationService.getFormation(id).subscribe({
      next: formation => {
        this.formation = formation;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger cette formation.';
        this.loading = false;
      }
    });
  }

  reserver(): void {
    if (!this.formation || !this.date || this.submitting) return;

    this.submitting = true;
    this.error = '';
    this.success = '';
    this.paymentMessage = '';
    this.paymentError = '';
    this.reservationId = null;

    this.reservationService.createReservation({
      formation: this.formation.id,
      date: this.date,
      ...(this.time ? { time: this.time } : {}),
      notes: this.notes
    }).subscribe({
      next: reservation => {
        this.reservationId = reservation.id;
        this.success = 'Réservation enregistrée. Vous pouvez maintenant préparer votre paiement.';
        this.submitting = false;
        this.date = '';
        this.time = '';
        this.notes = '';
      },
      error: err => {
        console.error('Erreur réservation :', err);
        const detail = err?.error;
        this.error = detail?.date?.[0] ||
          detail?.time?.[0] ||
          detail?.formation?.[0] ||
          detail?.detail ||
          'Impossible d’enregistrer la réservation. Vérifiez les champs saisis.';
        this.submitting = false;
      }
    });
  }

  preparerPaiement(): void {
    const reservationId = this.reservationId;
    if (reservationId === null || this.paymentSubmitting) return;

    this.paymentSubmitting = true;
    this.paymentError = '';
    this.paymentMessage = '';

    this.paymentService.createPayment({
      reservation: reservationId,
      method: this.paymentMethod
    }).subscribe({
      next: () => {
        this.paymentMessage =
          'Demande de paiement enregistrée en attente. Le paiement en ligne sera activé après la configuration du compte marchand.';
        this.paymentSubmitting = false;
      },
      error: err => {
        console.error('Erreur paiement :', err);
        this.paymentError = err?.error?.detail ||
          err?.error?.reservation?.[0] ||
          err?.error?.method?.[0] ||
          'Impossible de créer la demande de paiement. Réessayez.';
        this.paymentSubmitting = false;
      }
    });
  }
}
