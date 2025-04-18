import { Component, inject } from '@angular/core';
import { List, ListService, TaskListComponent } from '../../shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-task-list',
  imports: [TaskListComponent],
  templateUrl: './single-task-list.component.html',
  styleUrl: './single-task-list.component.scss',
})
export class SingleTaskListComponent {
  list: List | undefined;
  listId: string | null = null;

  private listService = inject(ListService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.listId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.listId) {
      this.getListData();
    }
  }

  getListData() {
    this.listService.getListById(this.listId!).subscribe((data) => {
      this.list = data;
    });
  }
}
