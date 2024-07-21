import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment.development';
import { TaskModel } from '../../interfaces/task-model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }

  async getTasks(): Promise<TaskModel[]> {
    const pb = new PocketBase(environment.baseUrl);
    return pb.collection('tasks').getFullList({ filter: 'complete = 0', sort: 'name' });
  }

  async updateTask(task: TaskModel) : Promise<TaskModel>{
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection("tasks").update(task.id, task);
  }

  async addTask(task: TaskModel) : Promise<TaskModel> {
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection("tasks").create(task);
  }

  async deleteTask(taskId: string) : Promise<boolean> {
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection('tasks').delete(taskId);
  }
}
