import { Component, inject, OnInit } from '@angular/core';
import { List, ListService, TaskListComponent } from '../../shared';

@Component({
  selector: 'app-daily-task-list',
  imports: [TaskListComponent],
  templateUrl: './daily-task-list.component.html',
  styleUrl: './daily-task-list.component.scss',
})
export class DailyTaskListComponent implements OnInit {
  dailyList: List | undefined;
  private listService = inject(ListService);

  ngOnInit(): void {
    this.listService.getMainList().subscribe((data) => {
      this.dailyList = data;
    });
  }
}
