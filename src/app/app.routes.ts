import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/home/home.component')
        .then(m => m.HomeComponent)
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
    path: 'formations',
    loadComponent: () =>
      import('./features/public/formations/formations.component')
        .then(m => m.FormationsComponent)
  },
  {
    path: 'formations/:id',
    loadComponent: () =>
      import('./features/public/formations/formation-detail/formation-detail.component')
        .then(m => m.FormationDetailComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component')
        .then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/auth/forgot-password/forgot-password.component')
        .then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'espace-client',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/user/dashboard/dashboard.component')
            .then(m => m.UserDashboardComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/user/profile/profile.component')
            .then(m => m.ProfileComponent)
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./features/user/courses/courses.component')
            .then(m => m.CoursesComponent)
      },
      {
        path: 'reservations',
        loadComponent: () =>
          import('./features/user/reservations/reservations.component')
            .then(m => m.ReservationsComponent)
      },
      {
        path: 'payments',
        loadComponent: () =>
          import('./features/user/payments/payments.component')
            .then(m => m.PaymentsComponent)
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./features/user/messages/messages.component')
            .then(m => m.MessagesComponent)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/user/settings/settings.component')
            .then(m => m.SettingsComponent)
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin/users/users.component')
            .then(m => m.UsersComponent)
      },
      {
        path: 'formations',
        loadComponent: () =>
          import('./features/admin/formations/formations.component')
            .then(m => m.FormationsComponent)
      },
      {
        path: 'modules',
        loadComponent: () =>
          import('./features/admin/modules/modules.component')
            .then(m => m.ModulesComponent)
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./features/admin/courses/courses.component')
            .then(m => m.CoursesComponent)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/admin/settings/settings.component')
            .then(m => m.SettingsComponent)
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./features/admin/portfolio/portfolio.component')
            .then(m => m.PortfolioComponent)
      },
      {
        path: 'reservations',
        loadComponent: () =>
          import('./features/admin/reservations/reservations.component')
            .then(m => m.ReservationsComponent)
      },
      {
        path: 'payments',
        loadComponent: () =>
          import('./features/admin/payments/payments.component')
            .then(m => m.PaymentsComponent)
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./features/admin/messages/messages.component')
            .then(m => m.MessagesComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'accueil'
  }
];
