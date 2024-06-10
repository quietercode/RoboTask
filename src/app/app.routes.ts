import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { TasksComponent } from './Pages/tasks/tasks.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LogoutComponent } from './Pages/logout/logout.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' }, 
    { path: 'tasks', component: TasksComponent }, 
    { path: 'register', component: RegisterComponent }, 
    { path: 'logout', component: LogoutComponent }
];
