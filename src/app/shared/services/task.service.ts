import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models';

const baseUrl = 'http://192.168.1.100:3000/api/';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);

  getTasks(): Observable<any> {
    return this.http.get(baseUrl + 'tasks');
  }

  insertTask(task: Partial<Task>): Observable<any> {
    return this.http.post(baseUrl + 'tasks', task);
  }

  getCompleteTasks(): Observable<any> {
    return this.http.get(baseUrl + 'compeleted');
  }

  getTaskByListId(id: string): Observable<any> {
    return this.http.get(baseUrl + 'tasks/query/' + id);
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get(baseUrl + 'tasks/' + id);
  }

  updateTaskById(id: string, model: Partial<Task>): Observable<any> {
    return this.http.put(baseUrl + 'tasks/' + id, model);
  }

  deleteTaskById(id: string): Observable<any> {
    return this.http.delete(baseUrl + 'tasks/' + id);
  }

  getCompletedTasks(): Observable<any> {
    return this.http.get(baseUrl + 'completed');
  }
}
