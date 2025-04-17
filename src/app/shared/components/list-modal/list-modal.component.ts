import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ListService } from '../../services';
import { List } from '../../models';

@Component({
  selector: 'app-list-modal',
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './list-modal.component.html',
  styleUrl: './list-modal.component.css',
})
export class ListModalComponent {
  listId: string | null = null;
  readonly dialog = inject(MatDialog);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  listService = inject(ListService);

  constructor() {
    this.listId = this.data?.listId;
  }

  listForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  onSubmit() {
    let model = { ...this.listForm.value };
    if (this.listId) {
      this.updateList(model);
    } else {
      this.addList(model);
    }
  }

  addList(model: Partial<List>) {
    this.listService.createList(model).subscribe(() => {});
  }

  updateList(model: Partial<List>) {
    this.listService.updateListById(this.listId!, model).subscribe(() => {});
  }
}
