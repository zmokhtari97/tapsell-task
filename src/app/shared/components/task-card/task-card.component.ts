import { Component, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Task } from '../../models';

@Component({
  selector: 'app-task-card',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    FormsModule,
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

  onMoveToDaily = output<boolean>();

  readonly dialog = inject(MatDialog);

  editTaskDialog() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: {
        listId: this.listId(),
        taskId: this.task()._id,
        task: this.task(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
