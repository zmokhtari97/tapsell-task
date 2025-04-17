import { Component, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ListModalComponent } from '../list-modal/list-modal.component';
import { List, Task, TaskModalComponent, TaskService } from '../..';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  imports: [MatIconModule, MatButtonModule, MatMenuModule, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  list = input.required<List>();
  editable = input(true);
  deletable = input(true);
  taskList: Task[] = [];

  readonly listDialog = inject(MatDialog);
  readonly taskDialog = inject(MatDialog);
  readonly taskService = inject(TaskService);

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.taskService.getTaskByListId(this.list()._id).subscribe((data) => {
      this.taskList = data;
    });
  }

  editListDialog() {
    const dialogRef = this.listDialog.open(ListModalComponent, {
      data: {
        listId: this.list()._id,
        list: this.list(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddTaskDialog() {
    const dialogRef = this.taskDialog.open(TaskModalComponent, {
      data: {
        listId: this.list()._id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
