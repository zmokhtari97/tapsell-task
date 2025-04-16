import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ListModalComponent } from '../list-modal/list-modal.component';

@Component({
  selector: 'app-task-list',
  imports: [MatIconModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  editable = input(true);
  deletable = input(true);

  readonly dialog = inject(MatDialog);

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
