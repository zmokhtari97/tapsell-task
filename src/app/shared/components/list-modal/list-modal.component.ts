import { Component, inject, OnInit } from '@angular/core';
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
  MatDialogRef,
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
  styleUrl: './list-modal.component.scss',
})
export class ListModalComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  listId: string | null = null;
  listService = inject(ListService);

  constructor() {}

  ngOnInit(): void {
    this.listId = this.data?.listId;
    if (this.listId) {
      const list = this.data.list;
      this.listForm.patchValue(list);
    }
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
    this.listService.createList(model).subscribe(() => {
      this.dialogRef.close({ success: true });
    });
  }

  updateList(model: Partial<List>) {
    this.listService.updateListById(this.listId!, model).subscribe(() => {
      this.dialogRef.close({ success: true });
    });
  }
}
