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
  isEditMode = false;
  readonly dialog = inject(MatDialog);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor() {
    this.isEditMode = this.data?.isEditMode ?? false;
  }

  listForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.log(this.listForm.value);
  }
}
