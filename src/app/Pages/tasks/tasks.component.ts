import { Component, OnInit, inject } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
import { TaskModel } from '../../interfaces/task-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styles: ``
})
export class TasksComponent implements OnInit {

  taskService: TasksService = inject(TasksService);

  tasks: Array<TaskModel> = new Array<TaskModel>();

  ngOnInit(): void {
    this.taskService.getTasks()
    .then((res: TaskModel[]) => {
      for(let t of res) {
        this.tasks.push(t);
      }
    })
    .catch((err) => {
      console.log(err); //Don't do this - handle it
    })
  }
}
