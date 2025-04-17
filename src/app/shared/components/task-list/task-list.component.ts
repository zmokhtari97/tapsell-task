import { Component, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ListModalComponent } from '../list-modal/list-modal.component';
import {
  List,
  ListService,
  NotificationService,
  SharedService,
  Task,
  TaskModalComponent,
  TaskService,
} from '../..';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task-list',
  imports: [MatIconModule, MatButtonModule, MatMenuModule, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  listId = input.required<string>();
  editable = input(true);
  deletable = input(true);
  list: List | null = null;
  taskList: Task[] = [];

  private subscription$ = new Subject<void>();

  readonly listDialog = inject(MatDialog);
  readonly taskDialog = inject(MatDialog);
  readonly router = inject(Router);
  readonly taskService = inject(TaskService);
  readonly listService = inject(ListService);
  readonly notificationService = inject(NotificationService);
  readonly sharedService = inject(SharedService);

  ngOnInit(): void {
    this.getList();
    this.getTaskList();
    this.updateListChanges();
  }

  getList() {
    this.listService.getListById(this.listId()).subscribe((data) => {
      this.list = data;
    });
  }

  updateListChanges() {
    this.sharedService.reloadListObs
      .pipe(takeUntil(this.subscription$))
      .subscribe((resp) => {
        if (resp == this.listId()) {
          this.getTaskList();
        }
      });
  }

  getTaskList() {
    this.taskService.getTaskByListId(this.listId()).subscribe((data) => {
      this.taskList = data;
    });
  }

  editListDialog() {
    const dialogRef = this.listDialog.open(ListModalComponent, {
      data: {
        listId: this.listId(),
        list: this.list,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.success) {
        this.notificationService.success('List edited successfully!');
        this.getList();
      }
    });
  }

  openAddTaskDialog() {
    const dialogRef = this.taskDialog.open(TaskModalComponent, {
      data: {
        listId: this.listId(),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.success) {
        this.notificationService.success('Task added successfully!');
        this.getTaskList();
      }
    });
  }

  deleteList() {
    if (
      confirm('Are you sure you want to delete ' + this.list?.title + ' list?')
    ) {
      this.listService.deleteListById(this.listId()).subscribe((res) => {
        this.notificationService.success('List deleted successfully!');
        this.router.navigate(['/main']);
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
