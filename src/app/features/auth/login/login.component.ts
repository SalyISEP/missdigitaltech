import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;
  registerQueryParams: { returnUrl?: string } = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnUrl) this.registerQueryParams = { returnUrl };
  }

  submit(): void {
    this.login();
  }

  login(): void {
    if (!this.email || !this.password) {
      this.error = 'Veuillez renseigner votre adresse e-mail et votre mot de passe.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl');

        this.router.navigateByUrl(
          returnUrl ||
          (this.authService.isAdmin()
            ? '/admin/dashboard'
            : '/espace-client/dashboard')
        );
      },
      error: () => {
        this.error = 'E-mail ou mot de passe incorrect.';
        this.loading = false;
      }
    });
  }
}
