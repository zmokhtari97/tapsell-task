import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  SharedService,
  Task,
  TaskCardComponent,
  TaskService,
} from '../../shared';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-completed-task-list',
  imports: [TaskCardComponent],
  templateUrl: './completed-task-list.component.html',
  styleUrl: './completed-task-list.component.scss',
})
export class CompletedTaskListComponent implements OnInit, OnDestroy {
  completeTasks: Task[] = [];
  subscription$ = new Subject<void>();

  taskService = inject(TaskService);
  sharedService = inject(SharedService);

  ngOnInit(): void {
    this.getData();
    this.subscribeOnReload();
  }

  getData() {
    this.taskService.getCompleteTasks().subscribe((data) => {
      this.completeTasks = data;
    });
  }

  subscribeOnReload() {
    this.sharedService.reloadListObs
      .pipe(takeUntil(this.subscription$))
      .subscribe(() => {
        this.getData();
      });
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
