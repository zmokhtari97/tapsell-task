import { Component, inject } from '@angular/core';
import {
  List,
  ListModalComponent,
  ListService,
  NotificationService,
} from '../../shared';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-all-task-list',
  imports: [RouterModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './all-task-list.component.html',
  styleUrl: './all-task-list.component.scss',
})
export class AllTaskListComponent {
  listService = inject(ListService);
  allList: List[] = [];

  private dialog = inject(MatDialog);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.listService.getAllLists().subscribe((data) => {
      this.allList = data;
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(ListModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result.success) {
        this.getData();
        this.notificationService.success('List added successfully!');
      }
    });
  }

  openEditDialog(list: List) {
    const dialogRef = this.dialog.open(ListModalComponent, {
      data: {
        listId: list._id,
        list: list,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.success) {
        this.getData();
        this.notificationService.success('List edited successfully!');
      }
    });
  }

  deleteList(title: string, listId: string) {
    if (confirm('Are you sure you want to delete ' + title + ' list?')) {
      this.listService.deleteListById(listId).subscribe((res) => {
        this.getData();
        this.notificationService.success('List deleted successfully!');
      });
    }
  }
}
