import { Component, OnInit, inject } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
import { TaskModel } from '../../interfaces/task-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styles: ``
})
export class TasksComponent implements OnInit {

  taskService: TasksService = inject(TasksService);
  authService: AuthService = inject(AuthService);

  tasks: Array<TaskModel> = new Array<TaskModel>();
  tasksHold: Array<string> = new Array<string>();
  userId: string = '';

  ngOnInit(): void {
    this.activate();
  }

  activate() {
    this.taskService.getTasks()
    .then((res: TaskModel[]) => {
      for(let t of res) {
        this.tasks.push(t);
        this.tasksHold.push(t.name);
      }
    })
    .catch((err) => {
      console.log(err); //Don't do this - handle it
    });

    this.authService.getUserId()
    .then((res: any) => {
      this.userId = res.id;
    });
  }

  hideTask(task: TaskModel) {

    setTimeout(() => {
      let idx = this.tasks.indexOf(task);
      this.tasks.splice(idx, 1);
    }, 500);

  }

  updateTask(task: TaskModel) {

    if(task.id == '') {
      this.saveNewTask(task);
    } else {
      this.taskService.updateTask(task)
      .then((res: TaskModel) => {
        task.editMode = false;
        let idx = this.tasks.indexOf(task);
        this.tasksHold[idx] = task.name;

        if(task.complete) {
          this.hideTask(task);
        }
      });
    }

  }

  editTask(task: TaskModel) {

    for(let t of this.tasks) {
      if(t != task && t.editMode) {
        this.cancelEdit(t);
      }
    }

    task.editMode = true;
  }

  cancelEdit(task: TaskModel) {
    let deleteTask = task.id == '';

    let idx = this.tasks.indexOf(task);
    task.name = this.tasksHold[idx];
    task.editMode = false;

    if(deleteTask) {
      this.tasks.splice(idx, 1);
      this.tasksHold.splice(idx, 1);
    }
  }

  async addTask() {
    
    this.tasks.push({id: '', 
      name: '', 
      complete: false, 
      user: this.userId, 
      created: new Date(), 
      updated: new Date(), 
      editMode: true });
      
    this.tasksHold.push('');
  }

  saveNewTask(task: TaskModel) {

    this.taskService.addTask(task)
    .then((res: TaskModel) => {
      let idx = this.tasks.indexOf(task);

      task.id = res.id;
      task.created = res.created;
      task.updated = res.updated;
      task.user = res.user;

      this.tasksHold[idx] = task.name;

      task.editMode = false;
    });
  }

  deleteTask(task: TaskModel) {
    this.taskService.deleteTask(task.id)
    .then((res: boolean) => {
      let idx = this.tasks.indexOf(task);
      this.tasks.splice(idx, 1);
      this.tasksHold.splice(idx, 1);
    });
  }
}
