import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../models';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  http = inject(HttpClient);

  getMainList(): Observable<any> {
    return this.http.get(environment.baseUrl + 'mainList');
  }

  getAllLists(): Observable<any> {
    return this.http.get(environment.baseUrl + 'lists');
  }

  createList(model: Partial<List>): Observable<any> {
    return this.http.post(environment.baseUrl + 'lists', model);
  }

  getListById(id: string): Observable<any> {
    return this.http.get(environment.baseUrl + 'lists/' + id);
  }

  updateListById(id: string, model: Partial<List>): Observable<any> {
    return this.http.put(environment.baseUrl + 'lists/' + id, model);
  }

  deleteListById(id: string): Observable<any> {
    return this.http.delete(environment.baseUrl + 'lists/' + id);
  }
}
