import { Component, inject } from '@angular/core';
import { List, ListModalComponent, ListService } from '../../shared';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-all-task-list',
  imports: [RouterModule],
  templateUrl: './all-task-list.component.html',
  styleUrl: './all-task-list.component.scss',
})
export class AllTaskListComponent {
  listService = inject(ListService);
  allList: List[] = [];

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.listService.getAllLists().subscribe((data) => {
      this.allList = data;
      console.log(this.allList);
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(ListModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.addList(result);
    });
  }

  addList(title: string) {
    let model = {
      title: title,
    };
    this.listService.createList(model).subscribe(() => {
      this.getData();
    });
  }
}
