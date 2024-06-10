import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from '../tasks/tasks.component';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TasksComponent],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  emailAddress: string = '';
  password: string = '';
  displayErrorMessage: boolean = false;

  login() {
    this.authService.login(this.emailAddress, this.password)
    .then((res: boolean) => {
      if(res) {
        this.router.navigateByUrl('/tasks');
      } else {
        this.displayErrorMessage = true;
      }
    })
  }

}
