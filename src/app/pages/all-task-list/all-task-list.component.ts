import { Component, inject } from '@angular/core';
import { List, ListService } from '../../shared';

@Component({
  selector: 'app-all-task-list',
  imports: [],
  templateUrl: './all-task-list.component.html',
  styleUrl: './all-task-list.component.scss',
})
export class AllTaskListComponent {
  listService = inject(ListService);

  allList: List[] = [];
  ngOnInit(): void {
    this.listService.getAllLists().subscribe((data) => {
      this.allList = data;
      console.log(this.allList);
    });
  }
}
