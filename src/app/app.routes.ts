import { Routes } from '@angular/router';

export const routes: Routes = [

  // =========================
  // SITE PUBLIC
  // =========================

  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },

  {
    path: 'accueil',
    loadComponent: () =>
      import('./features/public/home/home.component')
        .then(m => m.HomeComponent)
  },

  {
    path: 'a-propos',
    loadComponent: () =>
      import('./features/public/about/about.component')
        .then(m => m.AboutComponent)
  },

  {
    path: 'expertises',
    loadComponent: () =>
      import('./features/public/expertises/expertises.component')
        .then(m => m.ExpertisesComponent)
  },

  {
    path: 'portfolio',
    loadComponent: () =>
      import('./features/public/portfolio/portfolio.component')
        .then(m => m.PortfolioComponent)
  },

  {
    path: 'fondatrice',
    loadComponent: () =>
      import('./features/public/fondatrice/fondatrice.component')
        .then(m => m.FondatriceComponent)
  },

  {
    path: 'contact',
    loadComponent: () =>
      import('./features/public/contact/contact.component')
        .then(m => m.ContactComponent)
  },

  {
    path: 'reserver',
    loadComponent: () =>
      import('./features/public/reservation/reservation.component')
        .then(m => m.ReservationComponent)
  },

  // =========================
  // AUTHENTIFICATION
  // =========================

  {
    path: 'connexion',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'inscription',
    loadComponent: () =>
      import('./features/auth/register/register.component')
        .then(m => m.RegisterComponent)
  },

  {
    path: 'mot-de-passe-oublie',
    loadComponent: () =>
      import('./features/auth/forgot-password/forgot-password.component')
        .then(m => m.ForgotPasswordComponent)
  },

  // =========================
  // ESPACE UTILISATEUR
  // =========================

  {
    path: 'espace-client',
    loadComponent: () =>
      import('./features/user/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },

  {
    path: 'espace-client/profil',
    loadComponent: () =>
      import('./features/user/profile/profile.component')
        .then(m => m.ProfileComponent)
  },

  {
    path: 'espace-client/reservations',
    loadComponent: () =>
      import('./features/user/reservations/reservations.component')
        .then(m => m.ReservationsComponent)
  },

  {
    path: 'espace-client/messages',
    loadComponent: () =>
      import('./features/user/messages/messages.component')
        .then(m => m.MessagesComponent)
  },

  {
    path: 'espace-client/parametres',
    loadComponent: () =>
      import('./features/user/settings/settings.component')
        .then(m => m.SettingsComponent)
  },

  // =========================
  // ADMINISTRATION
  // =========================

  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },

  {
    path: 'admin/utilisateurs',
    loadComponent: () =>
      import('./features/admin/users/users.component')
        .then(m => m.UsersComponent)
  },

  {
    path: 'admin/reservations',
    loadComponent: () =>
      import('./features/admin/reservations/reservations.component')
        .then(m => m.ReservationsComponent)
  },

  {
    path: 'admin/messages',
    loadComponent: () =>
      import('./features/admin/messages/messages.component')
        .then(m => m.MessagesComponent)
  },

  {
    path: 'admin/portfolio',
    loadComponent: () =>
      import('./features/admin/portfolio/portfolio.component')
        .then(m => m.PortfolioComponent)
  },

  {
    path: 'admin/parametres',
    loadComponent: () =>
      import('./features/admin/settings/settings.component')
        .then(m => m.SettingsComponent)
  },

  // =========================
  // PAGE INEXISTANTE
  // =========================

  {
    path: '**',
    redirectTo: 'accueil'
  }

];