import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private mainListId$: string | null = null;
  private reloadListObs = new BehaviorSubject<string | null>(null);

  set mainListId(id: string) {
    this.mainListId$ = id;
  }

  get mainListId(): string | null {
    return this.mainListId$;
  }
}
