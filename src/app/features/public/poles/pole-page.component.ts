import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pole-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pole-page.component.html',
  styleUrl: './pole-page.component.scss'
})
export class PolePageComponent {
  pole: any;

  private readonly poles: Record<string, any> = {
    tech: {
      number: '01',
      name: 'MDT TECH',
      title: 'La technologie au service de vos ambitions.',
      intro: 'Nous transformons vos idées en solutions numériques fiables, modernes et adaptées à vos objectifs.',
      services: ['Création de sites web', 'Applications web et mobiles', 'E-commerce et API REST', 'Intelligence artificielle', 'Cybersécurité et réseaux', 'Cloud, maintenance et accompagnement']
    },
    com: {
      number: '02',
      name: 'MDT COM',
      title: 'Donner du sens à votre communication.',
      intro: 'Nous aidons les marques et les organisations à construire une présence cohérente, visible et professionnelle.',
      services: ['Identité visuelle et branding', 'Community management', 'Stratégie social media', 'Publicité digitale', 'Création de contenus', 'Conseil en communication']
    },
    print: {
      number: '03',
      name: 'MDT PRINT',
      title: 'Des supports qui portent votre image.',
      intro: 'Des créations graphiques soignées pour rendre votre identité reconnaissable sur tous vos supports.',
      services: ['Cartes de visite', 'Flyers et affiches', 'Conception graphique', 'Supports professionnels', 'Visuels publicitaires', 'Préparation des fichiers d’impression']
    },
    media: {
      number: '04',
      name: 'MDT MEDIA',
      title: 'Raconter vos idées avec impact.',
      intro: 'Nous imaginons des contenus audiovisuels qui valorisent les personnes, les projets, les marques et les événements.',
      services: ['Création de contenus', 'Interviews et reportages', 'Podcast et émissions', 'Photo et vidéo', 'Couverture événementielle', 'Communication audiovisuelle']
    },
    academy: {
      number: '05',
      name: 'MDT ACADEMY',
      title: 'Apprendre. Pratiquer. Évoluer.',
      intro: 'Des parcours orientés vers la pratique pour développer des compétences numériques et professionnelles utiles.',
      services: ['Initiation au numérique', 'Développement web', 'Bureautique et outils numériques', 'Communication digitale', 'Entrepreneuriat et e-commerce', 'Ateliers pratiques']
    },
    equip: {
      number: '06',
      name: 'MDT EQUIP',
      title: 'Les bons équipements pour aller plus loin.',
      intro: 'Nous accompagnons étudiants, entrepreneurs et professionnels dans le choix et la mise en service de leurs équipements.',
      services: ['Ordinateurs et accessoires', 'Solutions de stockage', 'Équipements d’impression', 'Matériel réseau', 'Installation et configuration', 'Maintenance et conseil']
    }
  };

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.pole = this.poles[data['pole']] ?? this.poles['tech'];
    });
  }
}
