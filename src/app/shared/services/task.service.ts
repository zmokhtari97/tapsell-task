import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = '192.168.1.100:3000/api/';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);

  getTasks(): Observable<any> {
    return this.http.get(baseUrl + 'tasks');
  }

  insertTask(task: any): Observable<any> {
    return this.http.post(baseUrl + 'tasks', task);
  }

  getTaskByListId(id: string): Observable<any> {
    return this.http.get(baseUrl + 'tasks/query/' + id);
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get(baseUrl + 'tasks/' + id);
  }

  updateTaskById(id: string, model: any): Observable<any> {
    return this.http.put(baseUrl + 'tasks/' + id, model);
  }

  deleteTaskById(id: string): Observable<any> {
    return this.http.delete(baseUrl + 'tasks/' + id);
  }

  getCompletedTasks(): Observable<any> {
    return this.http.get(baseUrl + 'completed');
  }
}
