import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../models';

const baseUrl = 'http://192.168.1.100:3000/api/';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  http = inject(HttpClient);

  getMainList(): Observable<any> {
    return this.http.get(baseUrl + 'mainList');
  }

  getAllLists(): Observable<any> {
    return this.http.get(baseUrl + 'lists');
  }

  createList(model: Partial<List>): Observable<any> {
    return this.http.post(baseUrl + 'lists', model);
  }

  getListById(id: string): Observable<any> {
    return this.http.get(baseUrl + 'lists/' + id);
  }

  updateListById(id: string, model: Partial<List>): Observable<any> {
    return this.http.put(baseUrl + 'lists/' + id, model);
  }

  deleteListById(id: string): Observable<any> {
    return this.http.delete(baseUrl + 'lists/' + id);
  }
}
