import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Task } from '../../models';
import { DatePipe } from '@angular/common';
import {
  NotificationService,
  SharedService,
  TaskService,
} from '../../services';

@Component({
  selector: 'app-task-card',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  task = input.required<Task>();
  listId = input.required();
  editable = input(true);
  ableToCheck = input(true);
  ableToMoveDaily = input(true);

  private dialog = inject(MatDialog);
  private taskService = inject(TaskService);
  private sharedService = inject(SharedService);
  private notificationService = inject(NotificationService);

  editTaskDialog() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: {
        listId: this.listId(),
        taskId: this.task()._id,
        task: this.task(),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.notificationService.success('Task updated successfully!');
        this.sharedService.reloadListObs.next(true);
      }
    });
  }

  onCheckTask(event: boolean) {
    this.taskService
      .updateTaskById(this.task()._id, {
        done: event,
      })
      .subscribe(() => {
        this.sharedService.reloadListObs.next(true);
        this.notificationService.success('Task updated successfully!');
      });
  }

  moveTaskToDaily() {
    this.taskService
      .updateTaskById(this.task()._id, {
        list: this.sharedService.mainListId!,
      })
      .subscribe(() => {
        this.notificationService.success('Task moved to daily successfully!');
        this.sharedService.reloadListObs.next(true);
      });
  }

  deleteCard() {
    if (
      confirm('Are you sure you want to delete ' + this.task().title + ' task?')
    ) {
      this.taskService.deleteTaskById(this.task()._id).subscribe((res) => {
        this.notificationService.success('Task deleted successfully!');
        this.sharedService.reloadListObs.next(true);
      });
    }
  }
}
