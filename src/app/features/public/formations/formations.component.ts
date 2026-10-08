import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Formation, FormationService } from '../../../core/services/formation.service';

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './formations.component.html',
  styleUrl: './formations.component.scss'
})
export class FormationsComponent implements OnInit {

  formations: Formation[] = [];
  loading = true;
  error = '';

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.loading = true;
    this.error = '';

    this.formationService.getFormations().subscribe({
      next: formations => {
        this.formations = formations;
        this.loading = false;
      },
      error: error => {
        console.error('Erreur formations:', error);
        this.error = 'Impossible de charger les formations.';
        this.loading = false;
      }
    });
  }
}
