import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  success = '';
  date = '';
  time = '';
  notes = '';
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService,
    private reservationService: ReservationService,
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
    if (!this.formation || !this.date) return;

    this.submitting = true;
    this.success = '';

    this.reservationService.createReservation({
      formation: this.formation.id,
      date: this.date,
      time: this.time,
      notes: this.notes
    }).subscribe({
      next: () => {
        this.success = 'Votre réservation a été enregistrée avec succès.';
        this.submitting = false;
        this.date = '';
        this.time = '';
        this.notes = '';
      },
      error: () => {
        this.error = 'Impossible d’enregistrer la réservation.';
        this.submitting = false;
      }
    });
  }
}
