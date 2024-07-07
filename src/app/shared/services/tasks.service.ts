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
}
