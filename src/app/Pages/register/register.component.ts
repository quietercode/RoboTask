import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { RegisterModel } from '../../interfaces/register-model';
import { RecordModel } from 'pocketbase';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent implements OnInit {

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);

  fg!: FormGroup;
  
  ngOnInit(): void {
    this.fg = this.fb.group({
      email: ['', [Validators.required, Validators.email] ], 
      password: ['', [Validators.required, Validators.minLength(8)] ], 
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)] ], 
      name: ['', [Validators.required, Validators.minLength(5)] ]
    });
  }

  register() {
    const registerModel: RegisterModel = {
      email: this.fg.get('email')!.value, 
      password: this.fg.get('password')!.value, 
      passwordConfirm: this.fg.get('passwordConfirm')!.value, 
      name: this.fg.get('name')!.value, 
      emailVisibility: false
    };

    this.authService.register(registerModel)
    .then((res: RecordModel) => {
      if(res['token'] != '') {
        this.router.navigateByUrl('/tasks');
      } //else would be to display some error
    })
    .catch((err) => {
      console.log(err);
      //Don't do this. handle it correctly
    });
  }

}
