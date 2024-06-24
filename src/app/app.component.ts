import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';
import { UserModel } from './interfaces/user-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'RoboTask';

  authService: AuthService = inject(AuthService);

  isLoggedIn: boolean = false;
  loggedInStatusSub?: Subscription;

  ngOnInit() {
    //If page reloades, get status
    this.authService.updateUserSubject();
    this.loggedInStatusSub = this.authService.user$.subscribe((res: UserModel | null) => {
      if(res === null) {
        this.isLoggedIn = false;
      } else {
        if(localStorage.getItem('pocketbase_auth') !== null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.loggedInStatusSub?.unsubscribe();
  }

}
