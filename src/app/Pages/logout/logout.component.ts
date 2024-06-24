import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styles: ``
})
export class LogoutComponent implements OnInit {

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.authService.logout()
    .then(() => {
      this.authService.updateUserSubject();
      this.router.navigateByUrl('/');
    })
  }

}
