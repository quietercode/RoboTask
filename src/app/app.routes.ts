import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { TasksComponent } from './Pages/tasks/tasks.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' }, 
    { path: 'tasks', component: TasksComponent }
];
