import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Formation, FormationService } from '../../../core/services/formation.service';
import { ReservationService } from '../../../core/services/reservation.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {
  formations: Formation[] = [];
  formationId: number | null = null;
  date = '';
  time = '';
  notes = '';
  loading = true;
  submitting = false;
  error = '';
  success = '';
  minDate = new Date().toLocaleDateString('en-CA');

  constructor(
    private formationService: FormationService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.formationService.getFormations().subscribe({
      next: formations => {
        this.formations = formations.filter(formation => formation.available);
        this.loading = false;
        if (!this.formations.length) {
          this.error = 'Aucune formation disponible pour le moment.';
        }
      },
      error: err => {
        console.error('Chargement des formations impossible :', err);
        this.error = 'Impossible de charger les formations. Réessayez plus tard.';
        this.loading = false;
      }
    });
  }

  reserver(): void {
    if (this.submitting) return;
    this.error = '';
    this.success = '';

    if (!this.formationId || !this.date) {
      this.error = 'Veuillez choisir une formation et une date.';
      return;
    }

    this.submitting = true;
    this.reservationService.createReservation({
      formation: Number(this.formationId),
      date: this.date,
      ...(this.time ? { time: this.time } : {}),
      notes: this.notes.trim()
    }).subscribe({
      next: () => {
        this.success = 'Votre demande de réservation a bien été enregistrée.';
        this.submitting = false;
        this.date = '';
        this.time = '';
        this.notes = '';
        this.formationId = null;
      },
      error: err => {
        console.error('Erreur réservation :', err);
        const detail = err?.error;
        this.error =
          detail?.date?.[0] ||
          detail?.time?.[0] ||
          detail?.formation?.[0] ||
          detail?.detail ||
          'La réservation a échoué. Vérifiez les informations puis réessayez.';
        this.submitting = false;
      }
    });
  }
}
