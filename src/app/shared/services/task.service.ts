import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);

  getTasks(): Observable<any> {
    return this.http.get(environment.baseUrl + 'tasks');
  }

  insertTask(task: Partial<Task>): Observable<any> {
    return this.http.post(environment.baseUrl + 'tasks', task);
  }

  getCompleteTasks(): Observable<any> {
    return this.http.get(environment.baseUrl + 'compeleted');
  }

  getTaskByListId(id: string): Observable<any> {
    return this.http.get(environment.baseUrl + 'tasks/query/' + id);
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get(environment.baseUrl + 'tasks/' + id);
  }

  updateTaskById(id: string, model: Partial<Task>): Observable<any> {
    return this.http.put(environment.baseUrl + 'tasks/' + id, model);
  }

  deleteTaskById(id: string): Observable<any> {
    return this.http.delete(environment.baseUrl + 'tasks/' + id);
  }

  getCompletedTasks(): Observable<any> {
    return this.http.get(environment.baseUrl + 'completed');
  }
}
