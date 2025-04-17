import { Component, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ListModalComponent } from '../list-modal/list-modal.component';
import { Task, TaskService } from '../..';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TaskCardComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  title = input('');
  listId = input('');
  editable = input(true);
  deletable = input(true);
  taskList: Task[] = [];

  readonly dialog = inject(MatDialog);
  readonly taskService = inject(TaskService);

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.taskService.getTaskByListId(this.listId()).subscribe((data) => {
      this.taskList = data;
    });
  }

  editListDialog() {
    const dialogRef = this.dialog.open(ListModalComponent, {
      data: {
        isEditMode: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
