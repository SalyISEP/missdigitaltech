import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Formation, FormationService } from '../../../../core/services/formation.service';
import { ReservationService } from '../../../../core/services/reservation.service';
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

  reservationMessage = '';
  reservationError = '';

  reservationDate = '';
  reservationTime = '10:00';
  reservationNotes = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formationService: FormationService,
    private reservationService: ReservationService,
    public auth: AuthService
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
      error: error => {
        console.error('Erreur formation:', error);
        this.error = 'Impossible de charger cette formation.';
        this.loading = false;
      }
    });
  }

  reserver(): void {
    this.reservationMessage = '';
    this.reservationError = '';

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/connexion']);
      return;
    }

    if (!this.formation) {
      return;
    }

    if (!this.reservationDate) {
      this.reservationError = 'Veuillez choisir une date.';
      return;
    }

    this.reservationService.createReservation({
      formation: this.formation.id,
      date: this.reservationDate,
      time: this.reservationTime,
      notes: this.reservationNotes
    }).subscribe({
      next: () => {
        this.reservationMessage =
          'Votre réservation a été enregistrée avec succès.';
        this.reservationNotes = '';
      },
      error: error => {
        console.error('Erreur réservation:', error);
        this.reservationError =
          error?.error?.detail ||
          'Impossible d’enregistrer la réservation.';
      }
    });
  }
}
